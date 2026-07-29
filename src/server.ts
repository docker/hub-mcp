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

import { createHash, timingSafeEqual } from 'crypto';
import express, { Express, NextFunction, Request, Response } from 'express';
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
import { logger } from './logger';

const STDIO_OPTION = 'stdio';
const STREAMABLE_HTTP_OPTION = 'http';

// Loopback host names that are always trusted for DNS-rebinding Host validation.
const LOOPBACK_HOSTS = ['localhost', '127.0.0.1', '::1'];
// Wildcard bind addresses that do not correspond to a single trusted host name.
const WILDCARD_HOSTS = ['0.0.0.0', '::'];

// JSON-RPC error codes used for transport-level rejections (implementation-defined
// server error range, per the JSON-RPC 2.0 spec).
const UNAUTHORIZED = -32001;
const FORBIDDEN = -32003;

/**
 * Options controlling the HTTP (streamable) transport. These have no effect on
 * the stdio transport, which is only reachable by the local process that spawns it.
 */
export interface HttpTransportOptions {
    /** Address to bind the HTTP listener to. Defaults to loopback (127.0.0.1). */
    host: string;
    /** Bearer token required on every /mcp request. */
    authToken?: string;
    /** Explicitly serve /mcp without authentication (insecure; opt-in only). */
    allowUnauthenticated: boolean;
    /** Extra Host header values accepted in addition to the loopback/bind host. */
    allowedHosts: string[];
    /** Origin header values accepted from browser clients (empty = reject all). */
    allowedOrigins: string[];
}

/**
 * Constant-time comparison of two secrets. Both sides are hashed first so the
 * comparison does not leak their length and so timingSafeEqual never sees
 * mismatched buffer sizes.
 */
function safeCompare(a: string, b: string): boolean {
    const ah = createHash('sha256').update(a).digest();
    const bh = createHash('sha256').update(b).digest();
    return timingSafeEqual(ah, bh);
}

export class HubMCPServer {
    private readonly server: Server;
    private readonly assets: Asset[];

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

        this.assets = [
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
        for (const asset of this.assets) {
            asset.RegisterTools();
        }
    }

    async run(
        port: number,
        transportType: string,
        httpOptions?: HttpTransportOptions
    ): Promise<void> {
        let transport = null;
        switch (transportType) {
            case STDIO_OPTION:
                transport = new StdioServerTransport();
                await this.server.connect(transport);
                logger.info('mcp server listening over stdio');
                break;
            case STREAMABLE_HTTP_OPTION: {
                const options = httpOptions ?? {
                    host: '127.0.0.1',
                    allowUnauthenticated: false,
                    allowedHosts: [],
                    allowedOrigins: [],
                };
                const app = this.buildHttpApp(options);
                app.listen(port, options.host, () => {
                    logger.info(`mcp server listening on ${options.host}:${port}`);
                    if (options.allowUnauthenticated) {
                        logger.warn(
                            'HTTP transport is running WITHOUT authentication ' +
                                '(--allow-unauthenticated). Any client able to reach ' +
                                `${options.host}:${port} can act as you on Docker Hub.`
                        );
                    }
                    if (WILDCARD_HOSTS.includes(options.host)) {
                        logger.warn(
                            `HTTP transport is bound to ${options.host} and is reachable ` +
                                'from the network. Ensure it is protected by authentication ' +
                                'and network controls.'
                        );
                    }
                });
                break;
            }
        }
    }

    /**
     * Builds the Express app for the HTTP transport, wiring the security guards and
     * the /mcp routes. Enforces the fail-closed authentication requirement (RG-4626):
     * the transport dispatches every tool under the operator's Docker Hub PAT, so it
     * must not be served without a credential unless the operator explicitly opts out.
     *
     * Exposed (rather than inlined into run()) so it can be exercised by tests without
     * binding a socket.
     */
    buildHttpApp(options: HttpTransportOptions): Express {
        if (!options.allowUnauthenticated && !options.authToken) {
            throw new Error(
                'Refusing to start the HTTP transport without authentication. ' +
                    'Set the MCP_AUTH_TOKEN environment variable so clients must present ' +
                    'a bearer token, or pass --allow-unauthenticated to run without one ' +
                    '(NOT recommended: any client that can reach the port could act as ' +
                    'you on Docker Hub using the server PAT).'
            );
        }
        const app = express();
        app.use(express.json());
        this.registerRoutes(app, options);
        return app;
    }

    /**
     * Rejects browser-driven and off-host requests to defeat DNS rebinding.
     *
     * The rebinding threat is browser-based: a page the operator visits scripts a
     * request to the local server. Such requests always carry an Origin header
     * (the /mcp endpoint requires application/json, which is never a CORS "simple"
     * request), so we reject any request bearing an Origin that is not explicitly
     * allow-listed. We additionally validate the Host header against an allow-list
     * so a rebound attacker domain (whose Host would not match) is refused. Genuine
     * MCP clients send no Origin and a loopback Host, so they are unaffected.
     */
    private dnsRebindingGuard(options: HttpTransportOptions) {
        const allowedHosts = new Set<string>([
            ...LOOPBACK_HOSTS,
            ...options.allowedHosts.map((host) => host.toLowerCase()),
        ]);
        if (options.host && !WILDCARD_HOSTS.includes(options.host)) {
            allowedHosts.add(options.host.toLowerCase());
        }
        const allowedOrigins = new Set<string>(
            options.allowedOrigins.map((origin) => origin.toLowerCase())
        );

        return (req: Request, res: Response, next: NextFunction): void => {
            const origin = this.headerValue(req.headers['origin']);
            if (origin && !allowedOrigins.has(origin.toLowerCase())) {
                logger.warn(`rejected request with disallowed origin: ${origin}`);
                this.rejectRequest(res, 403, FORBIDDEN, 'Origin not allowed');
                return;
            }

            const hostname = this.parseHostname(this.headerValue(req.headers['host']));
            if (!hostname || !allowedHosts.has(hostname.toLowerCase())) {
                logger.warn(`rejected request with disallowed host: ${hostname ?? '<none>'}`);
                this.rejectRequest(res, 403, FORBIDDEN, 'Host not allowed');
                return;
            }

            next();
        };
    }

    /** Requires a valid bearer token unless authentication is explicitly disabled. */
    private authGuard(options: HttpTransportOptions) {
        return (req: Request, res: Response, next: NextFunction): void => {
            if (options.allowUnauthenticated) {
                next();
                return;
            }

            const header = this.headerValue(req.headers['authorization'])?.trim() ?? '';
            const match = /^Bearer\s+(.+)$/i.exec(header);
            if (!options.authToken || !match || !safeCompare(match[1], options.authToken)) {
                this.rejectRequest(res, 401, UNAUTHORIZED, 'Unauthorized');
                return;
            }

            next();
        };
    }

    private headerValue(value: string | string[] | undefined): string | undefined {
        return Array.isArray(value) ? value[0] : value;
    }

    /** Extracts the hostname from a Host header, stripping any port and IPv6 brackets. */
    private parseHostname(hostHeader?: string): string | undefined {
        if (!hostHeader) {
            return undefined;
        }
        if (hostHeader.startsWith('[')) {
            const end = hostHeader.indexOf(']');
            return end === -1 ? undefined : hostHeader.slice(1, end);
        }
        const colon = hostHeader.indexOf(':');
        return colon === -1 ? hostHeader : hostHeader.slice(0, colon);
    }

    private rejectRequest(res: Response, status: number, code: number, message: string) {
        if (!res.headersSent) {
            res.status(status).json({
                jsonrpc: JSONRPC_VERSION,
                error: { code, message },
                id: null,
            });
        }
    }

    private registerRoutes(app: Express, options: HttpTransportOptions) {
        app.use('/mcp', this.dnsRebindingGuard(options), this.authGuard(options));

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

    public GetAssets(): Asset[] {
        return this.assets;
    }
}
