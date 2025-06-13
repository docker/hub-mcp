import { MCPResource, Resource, ResourceConfig } from "./types";
import { OpenAPI, OpenAPIV3 } from "openapi-types";

type Route = {
  path: string;
  method: string;
  operation: OpenAPIV3.OperationObject;
};

export class API extends Resource {
  private components: Map<string, OpenAPIV3.ParameterObject>;
  private routes: Map<string, Route>;
  constructor(private spec: OpenAPIV3.Document, config: ResourceConfig) {
    super(config);
    this.components = new Map();
    this.routes = new Map();
    this.tokens = new Map();
  }

  RegisterTools() {
    const paths = this.spec.paths || {};
    for (const [path, methods] of Object.entries(paths)) {
      let pathParams: OpenAPI.Parameter[] = [];

      for (const [method, operation] of Object.entries(methods as any)) {
        if (method === "parameters") {
          for (const routeParam of (methods as any)[method]) {
            pathParams.push(routeParam as OpenAPI.Parameter);
            if (!this.components.has(routeParam.name)) {
              this.components.set(
                routeParam.name,
                routeParam as OpenAPIV3.ParameterObject
              );
            }
          }
        }
        if (
          !(operation as OpenAPIV3.OperationObject).deprecated &&
          this.isValidHttpMethod(method) &&
          typeof operation === "object"
        ) {
          const toolName = (operation as any).operationId;
          if (pathParams.length > 0) {
            (operation as any).parameters = [
              ...((operation as any).parameters || []),
              ...pathParams,
            ];
          }
          const op = operation as OpenAPIV3.OperationObject;
          this.routes.set(toolName, {
            path,
            method: method.toLowerCase(),
            operation: op,
          });
          this.tools.set(toolName, {
            name: toolName,
            description:
              op.summary ||
              op.description ||
              `${method.toUpperCase()} ${path} (${this.config.name})`,
            inputSchema: this.generateInputSchema(op, path),
          });
        }
      }
    }
  }
  async ExecuteTool(toolName: string, args: any): Promise<any> {
    const route = this.routes.get(toolName);
    if (!route) {
      throw new Error(`Tool ${toolName} not found`);
    }
    const { path, method, operation } = route;
    try {
      if (!operation || !path || !method) {
        throw new Error(`No operation found for tool in: ${this.config.name}`);
      }
      // Build URL with path parameters
      let encodedPath = path;
      const pathParams =
        operation.parameters?.filter(
          (p) => (p as OpenAPIV3.ParameterObject).in === "path"
        ) || [];
      let namespace = "";

      for (const param of pathParams as OpenAPIV3.ParameterObject[]) {
        if (args[param.name] !== undefined) {
          if (param.name === "namespace") {
            namespace = String(args[param.name]);
          }
          encodedPath = encodedPath.replace(
            `{${param.name}}`,
            encodeURIComponent(args[param.name])
          );
        } else if (param.required) {
          throw new Error(`Missing required path parameter: ${param.name}`);
        }
      }

      // Build query parameters
      const queryParams =
        operation.parameters?.filter(
          (p) => (p as OpenAPIV3.ParameterObject).in === "query"
        ) || [];
      const searchParams = new URLSearchParams();

      for (const param of queryParams as OpenAPIV3.ParameterObject[]) {
        if (
          args[param.name] !== undefined &&
          args[param.name] !== null &&
          args[param.name] !== "" &&
          args[param.name] !== "null"
        ) {
          searchParams.append(param.name, String(args[param.name]));
        }
      }

      if (searchParams.toString()) {
        encodedPath += "?" + searchParams.toString();
      }

      // Build headers
      const headers: Record<string, string> = {
        "Content-Type": "application/json",
        "User-Agent": "OpenAPI-MCP-Server/1.0.0",
      };

      // Add header parameters
      const headerParams =
        operation.parameters?.filter(
          (p) => (p as OpenAPIV3.ParameterObject).in === "header"
        ) || [];
      for (const param of headerParams as OpenAPIV3.ParameterObject[]) {
        if (args[param.name] !== undefined) {
          headers[param.name] = String(args[param.name]);
        }
      }

      // Build request body
      let body: string | undefined;
      if (["post", "put", "patch"].includes(method) && args.body) {
        body = JSON.stringify(args.body);
      }

      const url = this.config.host + encodedPath;
      await this.authenticate(headers);
      console.error(
        `Making ${method.toUpperCase()} ${
          headers["Authorization"] ? "authenticated " : " "
        }request to: ${url}`
      );

      // Make the API call.
      let response = await fetch(url, {
        method: method.toUpperCase(),
        headers,
        body,
      });

      const responseText = await response.text();
      let responseData: any;

      try {
        responseData = JSON.parse(responseText);
      } catch {
        responseData = responseText;
      }

      if (!response.ok) {
        return {
          content: [
            {
              type: "text",
              text: `API call failed with status ${
                response.status
              }: ${JSON.stringify(responseData, null, 2)}`,
            },
          ],
          isError: true,
        };
      }

      return {
        content: [
          {
            type: "text",
            text: `✅ ${method.toUpperCase()} ${encodedPath} (${
              response.status
            })\n\n${JSON.stringify(responseData, null, 2)}`,
          },
        ],
      };
    } catch (error) {
      return {
        content: [
          {
            type: "text",
            text: `❌ Error executing API call: ${
              error instanceof Error ? error.message : String(error)
            }`,
          },
        ],
        isError: true,
      };
    }
  }

  private isValidHttpMethod(method: string): boolean {
    return [
      "get",
      "post",
      "put",
      "patch",
      "delete",
      "head",
      "options",
    ].includes(method.toLowerCase());
  }

  private generateInputSchema(
    operation: OpenAPIV3.OperationObject,
    path: string
  ): any {
    const properties: any = {};
    const required: string[] = [];

    // Add parameters (path, query, header)
    let parameters =
      (operation.parameters as OpenAPIV3.ParameterObject[]) || [];

    // Sort parameters by in (path, query, header)
    parameters = (parameters as OpenAPIV3.ParameterObject[]).sort((a, b) => {
      if (a.in === "path" && b.in !== "path") return -1;
      if (a.in !== "path" && b.in === "path") return 1;
      return 0;
    });
    for (const param of parameters) {
      if (
        param.in === "path" ||
        param.in === "query" ||
        param.in === "header"
      ) {
        properties[param.name!] = {
          // if in is defined then name is also defined
          type: (param.schema as OpenAPIV3.SchemaObject).type || "string",
          description: param.description || `${param.in} parameter`,
        };

        if (param.required) {
          required.push(param.name!);
        }
      }
    }

    // Add request body if present
    if (operation.requestBody) {
      const jsonContent = (operation.requestBody as OpenAPIV3.RequestBodyObject)
        .content?.["application/json"];
      if (jsonContent?.schema) {
        properties.body = {
          ...jsonContent.schema,
          description: "Request body data",
        };

        if ((operation.requestBody as OpenAPIV3.RequestBodyObject).required) {
          required.push("body");
        }
        if ((jsonContent.schema as OpenAPIV3.SchemaObject).properties) {
          for (const [propName, prop] of Object.entries(
            (jsonContent.schema as OpenAPIV3.SchemaObject).properties!
          )) {
            if ((prop as any).required) {
              required.push(`"body"."${propName}"`);
            }
          }
        }
      }
    }

    return {
      type: "object",
      properties,
      required,
    };
  }
}
