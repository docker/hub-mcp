import { McpServer as Server } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { Tool as MCPTool } from "@modelcontextprotocol/sdk/types.js";
import SwaggerParser from "@apidevtools/swagger-parser";
import { ScoutAPI } from "./scout";
import { Asset, AssetConfig } from "./asset";
import { API } from "./api";
import path from "path";
import { Repos } from "./repos";
import { Accounts } from "./accounts";
import { Search } from "./search";

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
  scoutEndpoint?: string;
  config: AssetConfig;
  path?: string;
  method?: string;
  operation?: OpenAPIOperation;
}

type Tool = MCPTool & ToolInfo;

const PAT_TOKEN = process.env.PAT_TOKEN;

class HubMCPServer {
  private server: Server;
  private assets: Map<string, Asset> = new Map();

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

    // Load all configured APIs
    const assets: Asset[] = [
      new Repos(this.server, {
        name: "repos",
        host: "https://hub.docker.com/v2",
        auth: {
          type: "pat",
          token: process.env.HUB_PAT_TOKEN,
          username: process.env.HUB_USERNAME,
        },
      }),
      new Accounts(this.server, {
        name: "accounts",
        host: "https://hub.docker.com/v2",
        auth: {
          type: "pat",
          token: process.env.HUB_PAT_TOKEN,
          username: process.env.HUB_USERNAME,
        },
      }),
      new Search(this.server, {
        name: "search",
        host: "https://hub.docker.com/api/search",
      }),
      new ScoutAPI(this.server, {
        name: "scout",
        host: "https://api.scout.docker.com",
        auth: {
          type: "pat",
          token: process.env.HUB_PAT_TOKEN,
          username: process.env.HUB_USERNAME,
        },
      }),
    ];
    for (const asset of assets) {
      asset.RegisterTools();
    }
  }

  async run(): Promise<void> {
    const transport = new StdioServerTransport();
    await this.server.connect(transport);
    console.error("🚀 OpenAPI MCP Server is running...");
  }
}

// Configuration - you can load this from a JSON file
const configs: AssetConfig[] = [
  {
    name: "repos",
    specPath:
      process.env.OPENAPI_SPEC_REPOS && process.env.OPENAPI_SPEC_REPOS !== ""
        ? process.env.OPENAPI_SPEC_REPOS
        : "file://./specs/repos.json",
    host: "https://hub.docker.com",
    auth: {
      type: "pat",
      token: process.env.HUB_PAT_TOKEN,
      username: process.env.HUB_USERNAME,
    },
  },
  {
    name: "accounts",
    specPath:
      process.env.OPENAPI_SPEC_ACCOUNTS &&
      process.env.OPENAPI_SPEC_ACCOUNTS !== ""
        ? process.env.OPENAPI_SPEC_ACCOUNTS
        : "file://./specs/accounts.json",
    host: "https://hub.docker.com",
    auth: {
      type: "pat",
      token: process.env.HUB_PAT_TOKEN,
      username: process.env.HUB_USERNAME,
    },
  },
  {
    name: "search",
    specPath:
      process.env.OPENAPI_SPEC_SEARCH && process.env.OPENAPI_SPEC_SEARCH !== ""
        ? process.env.OPENAPI_SPEC_SEARCH
        : "file://./specs/search.yaml",
    host: "https://hub.docker.com/api/search",
  },
  {
    name: "scout",
    host: "https://api.scout.docker.com",
    auth: {
      type: "pat",
      token: process.env.HUB_PAT_TOKEN,
      username: process.env.HUB_USERNAME,
    },
  },
];

// Main execution
async function main() {
  const server = new HubMCPServer();
  // Start the server
  await server.run();
}

// Handle errors and start the server
process.on("unhandledRejection", (error) => {
  console.error("Unhandled rejection:", error);
  process.exit(1);
});

main().catch((error) => {
  console.error("Failed to start server:", error);
  process.exit(1);
});
