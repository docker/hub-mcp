/*
   Copyright 2025 Docker Hub MCP Server authors

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/

import express, { Express, Request, Response } from 'express';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { StreamableHTTPServerTransport } from '@modelcontextprotocol/sdk/server/streamableHttp.js';
import { McpServer as Server } from '@modelcontextprotocol/sdk/server/mcp.js';
import {
    JSONRPC_VERSION,
    METHOD_NOT_FOUND,
    INTERNAL_ERROR,
} from '@modelcontextprotocol/specification/schema/2025-06-18/schema';
import { ScoutAPI } from './scout';
import { Asset } from './asset';
import { Repos } from './repos';
import { Accounts } from './accounts';
import { Search } from './search';
import { initLogger, logger } from './logger';

const DEFAULT_PORT = 3000;
const STDIO_OPTION = 'stdio';
const STREAMABLE_HTTP_OPTION = 'http';

class HubMCPServer {
    private readonly server: Server;

    constructor(username?: string, patToken?: string) {
        this.server = new Server(
            {
                name: 'dockerhub-mcp-server',
                version: '1.0.0',
            },
            {
                capabilities: {
                    tools: {},
                },
            }
        );

        const assets: Asset[] = [
            new Repos(this.server, {
                name: 'repos',
                host: 'https://hub.docker.com/v2',
                auth: {
                    type: 'pat',
                    token: patToken,
                    username: username,
                },
            }),
            new Accounts(this.server, {
                name: 'accounts',
                host: 'https://hub.docker.com/v2',
                auth: {
                    type: 'pat',
                    token: patToken,
                    username: username,
                },
            }),
            new Search(this.server, {
                name: 'search',
                host: 'https://hub.docker.com/api/search',
            }),
            new ScoutAPI(this.server, {
                name: 'scout',
                host: 'https://api.scout.docker.com',
                auth: {
                    type: 'pat',
                    token: patToken,
                    username: username,
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
                logger.info('mcp server listening over stdio');
                break;
            case STREAMABLE_HTTP_OPTION: {
                const app = express();
                app.use(express.json());
                this.registerRoutes(app);
                app.listen(port, () => {
                    logger.info(`mcp server listening on port ${port}`);
                });
                break;
            }
        }
    }

    private registerRoutes(app: Express) {
        app.post('/mcp', async (req: Request, res: Response) => {
            const sanitizedBody = JSON.stringify(req.body).replace(/\n|\r/g, '');
            logger.info(`received mcp request: ${sanitizedBody}`);
            try {
                const transport = new StreamableHTTPServerTransport({
                    sessionIdGenerator: undefined,
                    enableJsonResponse: true,
                });

                await this.server.connect(transport);
                await transport.handleRequest(req, res, req.body);
            } catch (error) {
                logger.info(`error handling mcp request: ${error}`);
                if (!res.headersSent) {
                    res.status(500).json({
                        jsonrpc: JSONRPC_VERSION,
                        error: {
                            code: INTERNAL_ERROR,
                            message: 'Internal server error',
                        },
                        id: null,
                    });
                }
            }
        });

        app.get('/mcp', async (req: Request, res: Response) => {
            logger.info('received get mcp request');
            res.writeHead(405).end(
                JSON.stringify({
                    jsonrpc: JSONRPC_VERSION,
                    error: {
                        code: METHOD_NOT_FOUND,
                        message: 'Method not allowed.',
                    },
                    id: null,
                })
            );
        });

        app.delete('/mcp', async (req: Request, res: Response) => {
            logger.info('received delete mcp request');
            res.writeHead(405).end(
                JSON.stringify({
                    jsonrpc: JSONRPC_VERSION,
                    error: {
                        code: METHOD_NOT_FOUND,
                        message: 'Method not allowed.',
                    },
                    id: null,
                })
            );
        });
    }
}

function parseTransportFlag(args: string[]): string {
    const transportArg = args.find((arg) => arg.startsWith('--transport='))?.split('=')[1];
    if (!transportArg) {
        logger.info(`transport unspecified, defaulting to ${STDIO_OPTION}`);
        return STDIO_OPTION;
    }

    return transportArg;
}

function parseUsernameFlag(args: string[]): string | undefined {
    const usernameArg = args.find((arg) => arg.startsWith('--username='))?.split('=')[1];
    if (!usernameArg) {
        logger.info('username unspecified');
        return undefined;
    }

    return usernameArg;
}

function parseLogsDir(args: string[]): string | undefined {
    const logsDirArg = args.find((arg) => arg.startsWith('--logs-dir='))?.split('=')[1];
    if (!logsDirArg) {
        console.warn('logs dir unspecified');
        return undefined;
    }

    return logsDirArg;
}

function parsePortFlag(args: string[]): number {
    const portArg = args.find((arg) => arg.startsWith('--port='))?.split('=')[1];
    if (!portArg || portArg.length === 0) {
        logger.info(`port unspecified, defaulting to ${DEFAULT_PORT}`);
        return DEFAULT_PORT;
    }

    const portParsed = parseInt(portArg, 10);
    if (isNaN(portParsed)) {
        logger.info(`invalid port specified, defaulting to ${DEFAULT_PORT}`);
        return DEFAULT_PORT;
    }

    return portParsed;
}

// Main execution
async function main() {
    const args = process.argv.slice(2);
    const logsDir = parseLogsDir(args);
    initLogger(logsDir);
    logger.info(args.length > 0 ? `provided arguments: ${args}` : 'no arguments provided');
    const transportArg = parseTransportFlag(args);
    const port = parsePortFlag(args);
    const username = parseUsernameFlag(args);
    const patToken = process.env.HUB_PAT_TOKEN;

    const server = new HubMCPServer(username, patToken);
    // Start the server
    await server.run(port, transportArg);
    logger.info('🚀 dockerhub mcp server is running...');
}

process.on('unhandledRejection', (error) => {
    logger.info(`unhandled rejection: ${error}`);
    process.exit(1);
});

main().catch((error) => {
    logger.info(`failed to start server: ${error}`);
    process.exit(1);
});

// Handle server shutdown
process.on('SIGINT', async () => {
    logger.info('shutting down server...');
    process.exit(0);
});
