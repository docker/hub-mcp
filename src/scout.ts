import { Tool } from "@modelcontextprotocol/sdk/types";
import { Asset, AssetConfig } from "./asset";
import { ScoutClient } from "./scout/client";
import fetch, { RequestInfo, RequestInit } from "node-fetch";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import z from "zod";

export class ScoutAPI extends Asset {
  private scoutClient: ScoutClient;
  constructor(private server: McpServer, config: AssetConfig) {
    super(config);
    this.scoutClient = new ScoutClient({
      url: "https://api.scout.docker.com/v1/graphql",
      headers: {
        "Content-Type": "application/json",
      },
      fetchFn: async (input: RequestInfo | URL, init?: RequestInit) => {
        const headers = {
          ...init?.headers,
          "Content-Type": "application/json",
        };
        const token = await this.authenticate();
        (headers as Record<string, string>)[
          "Authorization"
        ] = `Bearer ${token}`;
        return fetch(input, {
          ...init,
          headers,
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
    this.server.registerTool(
      "docker-hardened-images",
      {
        description:
          "Docker Hardened Images (DHI) API. This API is used to query for mirrored DHIs in the namespace. It lists all the secure, minimal, production-ready images available to get near-zero CVEs and enterprise-grade SLA.",
        inputSchema: z.object({
          namespace: z
            .string()
            .describe(
              "The namespace to query for mirrored hardened repositories"
            ),
        }).shape,
        annotations: {
          title: "List available Docker Hardened Images",
        },
      },
      async ({ namespace }) => {
        const { data, errors } = await this.scoutClient.query({
          dhiListMirroredRepositories: {
            __args: {
              context: { organization: namespace },
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
    );
  }
}
