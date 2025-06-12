import { Tool } from "@modelcontextprotocol/sdk/types";
import { MCPResource, Resource, ResourceConfig } from "./types";
import { ScoutClient } from "./scout/client";
import fetch, { RequestInfo, RequestInit } from "node-fetch";

export class ScoutAPI extends Resource {
  private scoutClient: ScoutClient;
  constructor(config: ResourceConfig) {
    super(config);
    this.scoutClient = new ScoutClient({
      url: "https://api.scout.docker.com/v1/graphql",
      fetchFn: (input: RequestInfo | URL, init?: RequestInit) => {
        return fetch(input, {
          ...init,
          headers: {
            ...init?.headers,
            Authorization: `Bearer ${this.config.auth?.token}`,
            "Content-Type": "application/json",
          },
        });
      },
      reportErrorFn: (error: Error, onErrorCallback?: () => void) => {
        console.error(`❌ Scout API error: ${error.message}`);
        if (onErrorCallback) {
          onErrorCallback();
        }
      },
    });
  }
  RegisterTools(): void {
    this.tools.set("docker-hardened-images", {
      name: "docker-hardened-images",
      description:
        "Docker Hardened Images (DHI) API. This API is used to query for mirrored DHIs in the namespace. It lists all the secure, minimal, production-ready images available to get near-zero CVEs and enterprise-grade SLA.",
      inputSchema: {
        type: "object",
        properties: {
          namespace: {
            type: "string",
            description:
              "The namespace to query for mirrored hardened repositories",
          },
        },
      },
    });
  }
  async ExecuteTool(toolName: string, args: any): Promise<any> {
    const { data, errors } = await this.scoutClient.query({
      dhiListMirroredRepositories: {
        __args: {
          context: { organization: args["namespace"] },
        },
        mirroredRepositories: {
          destinationRepository: {
            name: true,
            namespace: true,
          },
          dhiSourceRepository: {
            displayName: true,
            namespace: true,
            name: true,
          },
        },
      },
    });
    if (errors) {
      return {
        content: [{ type: "text", text: JSON.stringify(errors, null, 2) }],
        isError: true,
      };
    }
    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(data, null, 2),
        },
      ],
    };
  }
  GetTools(): Tool[] {
    return Array.from(this.tools.values());
  }
  GetToolsCount(): number {
    return this.tools.size;
  }
  GetTool(toolName: string): Tool | undefined {
    return this.tools.get(toolName);
  }
}
