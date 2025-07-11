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

import { CallToolResult } from '@modelcontextprotocol/sdk/types';
import { logger } from './logger';
import { RegisteredTool } from '@modelcontextprotocol/sdk/server/mcp';
import { jwtDecode } from 'jwt-decode';

export type AssetConfig = {
    name: string;
    host: string;
    auth?: {
        type: 'bearer' | 'pat';
        token?: string;
        username?: string;
    };
};

export type AssetResponse<T> = {
    content: T | null;
    isAuthenticated: boolean;
    code: number;
};

export class Asset implements Asset {
    protected tools: Map<string, RegisteredTool>;
    protected tokens: Map<string, { token: string; expirationDate: Date }>;
    constructor(protected config: AssetConfig) {
        this.tokens = new Map();
        this.tools = new Map();
    }
    RegisterTools(): void {
        throw new Error('Method not implemented.');
    }

    ListTools(): Map<string, RegisteredTool> {
        return this.tools;
    }

    protected async authFetch<T>(url: string, options: RequestInit): Promise<AssetResponse<T>> {
        const headers = options.headers || {
            'Content-Type': 'application/json',
            'User-Agent': 'DockerHub-MCP-Server/1.0.0',
        };
        const token = await this.authenticate();
        if (token) {
            (headers as Record<string, string>)['Authorization'] = `Bearer ${token}`;
        }
        const response = await fetch(url, { ...options, headers });
        const responseText = await response.text();
        if (!response.ok) {
            // try to get the error message from the response
            logger.error(
                `HTTP error on '${url}' with request: ${JSON.stringify(
                    options
                )}\n status: ${response.status} ${response.statusText}\n error: ${responseText}`
            );

            throw new Error(
                `HTTP error! status: ${response.status} ${response.statusText} ${responseText}`
            );
        }
        try {
            return {
                content: responseText ? (JSON.parse(responseText) as T) : null,
                isAuthenticated: token !== '',
                code: response.status,
            };
        } catch (err) {
            logger.warn(`Response is not JSON: ${responseText}. ${err}`);
            return {
                content: responseText as T,
                isAuthenticated: token !== '',
                code: response.status,
            };
        }
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    protected async callAPI<T>(
        url: string,
        options: RequestInit,
        outMsg?: string,
        errMsg?: string,
        unAuthMsg?: string
    ): Promise<CallToolResult>;
    protected async callAPI(
        url: string,
        options: RequestInit,
        outMsg?: string,
        errMsg?: string,
        unAuthMsg?: string
    ): Promise<CallToolResult>;
    protected async callAPI<T = unknown>(
        url: string,
        options: RequestInit,
        outMsg?: string,
        errMsg?: string,
        unAuthMsg?: string
    ): Promise<CallToolResult> {
        logger.info(`Calling API '${url}' with request: ${JSON.stringify(options)}`);
        try {
            const response = await this.authFetch<T>(url, options);
            if (outMsg?.includes(':response')) {
                outMsg = outMsg.replace(':response', JSON.stringify(response));
            }

            const result: CallToolResult = {
                content: [
                    {
                        type: 'text',
                        text: outMsg || 'Success',
                    },
                ],
            };

            // If T is specified (not 'any'), include structuredContent
            if (response.content !== null && typeof response.content === 'object') {
                result.structuredContent = response.content as { [x: string]: unknown };
            }
            if (!response.isAuthenticated) {
                result.content.push({
                    type: 'text',
                    text: `The request was not authenticated. ${unAuthMsg || ''}`,
                });
            }
            logger.info(`API call '${url}' completed successfully.`);
            logger.debug(`Response: ${JSON.stringify(result)}`);
            return result;
        } catch (error) {
            logger.error(`Error calling API '${url}': ${error}`);
            return {
                content: [
                    {
                        type: 'text',
                        text: `${errMsg ? errMsg + ': ' : ''}${(error as Error).message}`,
                    },
                ],
                structuredContent: { error: (error as Error).message },
                isError: true,
            };
        }
    }

    protected async authenticate(): Promise<string> {
        // Add authentication
        if (this.config.auth) {
            console.error(`Authenticating with ${this.config.auth.type}`);
            switch (this.config.auth.type) {
                case 'bearer':
                    if (this.config.auth.token) {
                        return this.config.auth.token;
                    }
                    break;
                case 'pat': {
                    if (!this.config.auth.username || !this.config.auth.token) {
                        logger.warn(`No username or token provided for PAT auth`);
                        this.tokens.set(this.config.auth.username!, {
                            token: '',
                            expirationDate: new Date('2030-01-01'),
                        });
                        return '';
                    }
                    if (!this.tokens.get(this.config.auth.username!)) {
                        const token = await this.authenticatePAT(this.config.auth.username!);
                        // get expiration date from token
                        const decoded = jwtDecode<{ exp: number }>(token);
                        const expirationDate = new Date(decoded.exp * 1000);
                        this.tokens.set(this.config.auth.username!, { token, expirationDate });
                        return token;
                    }
                    const token = this.tokens.get(this.config.auth.username!)!;
                    if (token.expirationDate < new Date()) {
                        // invalidate token
                        this.tokens.delete(this.config.auth.username!);
                        return this.authenticate();
                    }
                    return token.token;
                }
                default:
                    throw new Error(`Unsupported auth type: ${this.config.auth.type}`);
            }
        }
        return '';
    }

    protected async authenticatePAT(username: string): Promise<string> {
        if (!username) {
            throw new Error('PAT auth: Username is empty');
        }
        console.error(`Authenticating PAT for ${username}`);
        const url = `https://hub.docker.com/v2/users/login`;
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username: username,
                password: this.config.auth?.token,
            }),
        });
        if (!response.ok) {
            throw new Error(
                `Failed to authenticate PAT for ${username}: ${response.status} ${response.statusText}`
            );
        }
        const data = (await response.json()) as {
            token: string;
            refresh_token: string;
        };
        return data.token;
    }
}
