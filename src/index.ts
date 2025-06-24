import express, {Express, Request, Response} from "express";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio";
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp";
import { McpServer as Server } from "@modelcontextprotocol/sdk/server/mcp.js";
import { JSONRPC_VERSION, METHOD_NOT_FOUND, INTERNAL_ERROR } from "@modelcontextprotocol/specification/schema/2025-06-18/schema";
import { ScoutAPI } from "./scout";
import { Asset } from "./asset";
import { Repos } from "./repos";
import { Accounts } from "./accounts";
import { Search } from "./search";

const DEFAULT_PORT = 3000;
const STDIO_OPTION = "stdio";
const STREAMABLE_HTTP_OPTION = "http";

class HubMCPServer {
  private readonly server: Server;

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

  async run(port: number, transportType: string): Promise<void> {
    let transport = null;
    switch (transportType) {
      case STDIO_OPTION:
        transport = new StdioServerTransport();
        await this.server.connect(transport);
        console.info("mcp server listening over stdio");
        break;
      case STREAMABLE_HTTP_OPTION:
        const app = express();
        app.use(express.json());
        this.registerRoutes(app);
        app.listen(port, () => {
          console.info("mcp server listening listening on port ${port}");
        });
        break;
    }
  }

  private registerRoutes(app: Express) {
    app.post("/mcp", async (req: Request, res: Response) => {
      const sanitizedBody = JSON.stringify(req.body).replace(/\n|\r/g, "");
      console.info("received mcp request:", sanitizedBody);
      try {
        let transport = new StreamableHTTPServerTransport({
          sessionIdGenerator: undefined,
          enableJsonResponse: true,
        });

        await this.server.connect(transport);
        await transport.handleRequest(req, res, req.body);
      } catch (error) {
        console.error("error handling mcp request:", error);
        if (!res.headersSent) {
          res.status(500).json({
            jsonrpc: JSONRPC_VERSION,
            error: {
              code: INTERNAL_ERROR,
              message: "Internal server error",
            },
            id: null,
          });
        }
      }
    });

    app.get("/mcp", async (req: Request, res: Response) => {
      console.info("received get mcp request");
      res.writeHead(405).end(JSON.stringify({
        jsonrpc: JSONRPC_VERSION,
        error: {
          code: METHOD_NOT_FOUND,
          message: "Method not allowed."
        },
        id: null
      }));
    });

    app.delete("/mcp", async (req: Request, res: Response) => {
      console.log("received delete mcp request");
      res.writeHead(405).end(JSON.stringify({
        jsonrpc: JSONRPC_VERSION,
        error: {
          code: METHOD_NOT_FOUND,
          message: "Method not allowed."
        },
        id: null
      }));
    });
  }
}

function parseTransportFlag(args: string[]): string {
  let transportArg = args.find(arg => arg.startsWith("--transport="))?.split("=")[1];
  if (!transportArg) {
    console.info("transport unspecified, defaulting to ${STDIO_OPTION}");
    return STDIO_OPTION;
  }

  return transportArg;
}

function parsePortFlag(args: string[]): number {
  let portArg = args.find(arg => arg.startsWith("--port="))?.split("=")[1];
  if (!portArg || portArg.length === 0) {
    console.info("port unspecified, defaulting to ${DEFAULT_PORT}");
    return DEFAULT_PORT;
  }

  let portParsed = parseInt(portArg, 10);
  if (isNaN(portParsed)) {
    console.warn("invalid port specified, defaulting to ${DEFAULT_PORT}");
    return DEFAULT_PORT;
  }

    return portParsed;
}

// Main execution
async function main() {
  const args = process.argv.slice(2);
  let transportArg = parseTransportFlag(args);
  let port = parsePortFlag(args);

  const server = new HubMCPServer();
  // Start the server
  await server.run(port, transportArg);
  console.error("🚀 openapi mcp server is running...");
}

// Handle errors and start the server
process.on("unhandledRejection", (error) => {
  console.error("unhandled rejection:", error);
  process.exit(1);
});

main().catch((error) => {
  console.error("failed to start server:", error);
  process.exit(1);
});

// Handle server shutdown
process.on("SIGINT", async () => {
  console.log("shutting down server...");
  process.exit(0);
});
