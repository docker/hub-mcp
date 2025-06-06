import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
  Tool as MCPTool,
  CallToolResult,
} from "@modelcontextprotocol/sdk/types.js";
import SwaggerParser from "@apidevtools/swagger-parser";
import fetch from "node-fetch";
import { readFile } from "fs/promises";

interface APIConfig {
  name: string;
  spec: string;
  baseUrl?: string;
  auth?: {
    type: "bearer" | "apikey" | "basic" | "pat";
    token?: string;
    apikey?: { header: string; value: string };
    basic?: { username: string; password: string };
  };
}

interface Parameter {
  $ref?: string;
  name?: string;
  in?: "path" | "query" | "header" | "cookie";
  required?: boolean;
  schema?: any;
  description?: string;
}

interface OpenAPIOperation {
  operationId?: string;
  summary?: string;
  description?: string;
  parameters?: Array<Parameter>;
  requestBody?: {
    required?: boolean;
    content?: {
      "application/json"?: {
        schema?: any;
      };
    };
  };
  responses?: any;
}

interface ToolInfo {
  config: APIConfig;
  path: string;
  method: string;
  operation: OpenAPIOperation;
}

type Tool = MCPTool & ToolInfo;

const PAT_TOKEN = process.env.PAT_TOKEN;

class OpenAPIMCPServer {
  private server: Server;
  private apiConfigs: Map<string, APIConfig> = new Map();
  private components: Map<string, Parameter> = new Map();
  private tools: Map<string, Tool> = new Map();
  private tokens: Map<string, string> = new Map();

  constructor() {
    this.server = new Server(
      {
        name: "dockerhub-mcp-server",
        version: "1.0.0",
      },
      {
        capabilities: {
          tools: {},
        },
      }
    );
    this.setupHandlers();
  }

  async loadAPI(config: APIConfig): Promise<void> {
    try {
      console.error(`Loading OpenAPI spec for ${config.name}...`);
      let spec: any;
      if (config.spec.startsWith("blob:")) {
        console.error(`Loading blob: ${config.spec}`);
        const blob = await fetch(config.spec);
        spec = await blob.arrayBuffer();
      } else if (config.spec.startsWith("file:")) {
        const file = await readFile(config.spec.replace("file://", ""));
        // Parse and dereference the OpenAPI spec
        spec = await SwaggerParser.dereference(
          config.spec.replace("file://", "")
        );
      }

      this.apiConfigs.set(config.name, {
        ...config,
        spec,
        baseUrl: config.baseUrl,
      });

      // Register tools for this API
      this.registerToolsForAPI(config.name, spec);

      console.error(
        `✅ Loaded ${config.name} with ${this.countOperations(spec)} operations`
      );
    } catch (error) {
      console.error(`❌ Failed to load API ${config.name}:`, error);
      throw error;
    }
  }

  private countOperations(spec: any): number {
    let count = 0;
    const paths = spec.paths || {};

    for (const methods of Object.values(paths)) {
      for (const [method, operation] of Object.entries(methods as any)) {
        if (this.isValidHttpMethod(method) && typeof operation === "object") {
          count++;
        }
      }
    }

    return count;
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

  private registerToolsForAPI(apiName: string, spec: any): void {
    const paths = spec.paths || {};
    for (const [path, methods] of Object.entries(paths)) {
      let pathParams: Parameter[] = [];

      for (const [method, operation] of Object.entries(methods as any)) {
        if (method === "parameters") {
          for (const routeParam of (methods as any)[method]) {
            pathParams.push(routeParam as Parameter);
            if (!this.components.has(routeParam.name)) {
              this.components.set(routeParam.name, routeParam as Parameter);
            }
          }
        }
        if (this.isValidHttpMethod(method) && typeof operation === "object") {
          const toolName = (operation as any).operationId;
          const config = this.apiConfigs.get(apiName)!;
          if (pathParams.length > 0) {
            (operation as any).parameters = [
              ...((operation as any).parameters || []),
              ...pathParams,
            ];
          }
          const op = operation as OpenAPIOperation;
          this.tools.set(toolName, {
            name: toolName,
            description:
              op.summary ||
              op.description ||
              `${method.toUpperCase()} ${path} (${config.name})`,
            inputSchema: this.generateInputSchema(op, path),
            config,
            path,
            method: method.toLowerCase(),
            operation: op,
          });
        }
      }
    }
  }

  private setupHandlers(): void {
    this.server.setRequestHandler(ListToolsRequestSchema, async () => {
      const tools: MCPTool[] = [];

      this.tools.forEach((tool) => {
        tools.push({
          name: tool.name,
          description: tool.description,
          inputSchema: tool.inputSchema,
        });
      });
      return { tools };
    });

    this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
      const { name, arguments: args } = request.params;
      console.error(`Calling tool: ${name}`);
      if (!this.tools.has(name)) {
        throw new Error(`Unknown tool: ${name}`);
      }

      const toolInfo = this.tools.get(name)!;
      return await this.executeAPICall(toolInfo, args || {});
    });
  }

  private generateInputSchema(operation: OpenAPIOperation, path: string): any {
    const properties: any = {};
    const required: string[] = [];
    const routeParams = path.matchAll(/\{([^}]+)\}/g);

    for (const param of routeParams) {
      const paramName = param[1]; // this gives the path parameter name
      if (this.components.has(paramName)) {
        const component = this.components.get(paramName);
        properties[paramName] = {
          type: component?.schema?.type || "string",
          description: component?.description || `${component?.in} parameter`,
          // required: component?.required || false,
        };
        if (component?.required) {
          required.push(paramName);
        }
      }
    }

    // Add parameters (path, query, header)
    const parameters = operation.parameters || [];
    for (const param of parameters) {
      if (
        param.in === "path" ||
        param.in === "query" ||
        param.in === "header"
      ) {
        properties[param.name!] = {
          // if in is defined then name is also defined
          type: param.schema?.type || "string",
          description: param.description || `${param.in} parameter`,
          // required: param.required || false,
        };

        if (param.required) {
          required.push(param.name!);
        }
      }
    }

    // Add request body if present
    if (operation.requestBody) {
      const jsonContent = operation.requestBody.content?.["application/json"];
      if (jsonContent?.schema) {
        properties.body = {
          ...jsonContent.schema,
          description: "Request body data",
        };

        if (operation.requestBody.required) {
          // set-repository-privacyproperties.body.required = true;
          required.push("body");
        }
        if (jsonContent.schema.properties) {
          for (const [propName, prop] of Object.entries(
            jsonContent.schema.properties
          )) {
            if ((prop as any).required) {
              // (prop as any).required = true;
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

  private async authenticatePAT(
    config: APIConfig,
    namespace: string
  ): Promise<string> {
    console.error(
      `Authenticating PAT for ${namespace} with token ${PAT_TOKEN}`
    );
    const url = `${config.baseUrl}/v2/users/login`;
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: namespace,
        password: PAT_TOKEN,
      }),
    });
    const data = (await response.json()) as {
      token: string;
      refresh_token: string;
    };
    return data.token;
  }

  private async executeAPICall(
    toolInfo: ToolInfo,
    args: any
  ): Promise<CallToolResult> {
    const { config, path, method, operation } = toolInfo;
    try {
      // Build URL with path parameters
      let encodedPath = path;
      const pathParams =
        operation.parameters?.filter((p) => p.in === "path") || [];
      let namespace = "";

      for (const param of pathParams) {
        if (args[param.name!] !== undefined) {
          if (param.name === "namespace") {
            namespace = String(args[param.name!]);
          }
          encodedPath = encodedPath.replace(
            `{${param.name}}`,
            encodeURIComponent(args[param.name!])
          );
        } else if (param.required) {
          throw new Error(`Missing required path parameter: ${param.name}`);
        }
      }

      // Build query parameters
      const queryParams =
        operation.parameters?.filter((p) => p.in === "query") || [];
      const searchParams = new URLSearchParams();

      for (const param of queryParams) {
        if (args[param?.name!] !== undefined) {
          searchParams.append(param.name!, String(args[param.name!]));
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

      // Add authentication
      if (config.auth) {
        console.error(`Authenticating with ${config.auth.type}`);
        switch (config.auth.type) {
          case "bearer":
            if (config.auth.token) {
              headers["Authorization"] = `Bearer ${config.auth.token}`;
            }
            break;
          case "apikey":
            if (config.auth.apikey) {
              headers[config.auth.apikey.header] = config.auth.apikey.value;
            }
            break;
          case "basic":
            if (config.auth.basic) {
              const credentials = Buffer.from(
                `${config.auth.basic.username}:${config.auth.basic.password}`
              ).toString("base64");
              headers["Authorization"] = `Basic ${credentials}`;
            }
            break;
          case "pat":
            let token = this.tokens.get(namespace);
            if (!token) {
              token = await this.authenticatePAT(config, namespace);
              this.tokens.set(namespace, token);
            }
            headers["Authorization"] = `Bearer ${token}`;
            break;
        }
      }

      // Add header parameters
      const headerParams =
        operation.parameters?.filter((p) => p.in === "header") || [];
      for (const param of headerParams) {
        if (args[param?.name!] !== undefined) {
          headers[param.name!] = String(args[param.name!]);
        }
      }

      // Build request body
      let body: string | undefined;
      if (["post", "put", "patch"].includes(method) && args.body) {
        body = JSON.stringify(args.body);
      }

      const url = config.baseUrl + encodedPath;
      console.error(
        `Making ${method.toUpperCase()} ${
          headers["Authorization"] ? "authenticated " : " "
        }request to: ${url}`
      );

      // Make the API call
      const response = await fetch(url, {
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

  async run(): Promise<void> {
    const transport = new StdioServerTransport();
    await this.server.connect(transport);
    console.error("🚀 OpenAPI MCP Server is running...");
  }
}

// Configuration - you can load this from a JSON file
const apiConfigs: APIConfig[] = [
  {
    name: "dockerhub",
    spec: process.env.OPENAPI_SPEC || "file://./openapi.json",
    baseUrl: "https://hub.docker.com",
  },
  // Add your APIs here:`
  // {
  //   name: 'my-api',
  //   spec: './my-api-spec.yaml',
  //   baseUrl: 'https://api.mycompany.com',
  //   auth: {
  //     type: 'bearer',
  //     token: process.env.MY_API_TOKEN
  //   }
  // }
];

// Main execution
async function main() {
  const server = new OpenAPIMCPServer();

  // Load all configured APIs
  for (const config of apiConfigs) {
    try {
      if (PAT_TOKEN) {
        config.auth = {
          type: "pat",
        };
      }
      await server.loadAPI(config);
    } catch (error) {
      console.error(`Failed to load API ${config.name}, skipping...`);
    }
  }

  // Start the server
  await server.run();
}

// Handle errors and start the server
process.on("unhandledRejection", (error) => {
  console.error("Unhandled rejection:", error);
  process.exit(1);
});

if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch((error) => {
    console.error("Failed to start server:", error);
    process.exit(1);
  });
}
