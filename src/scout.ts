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

import { Asset, AssetConfig } from './asset';
import { ScoutClient } from './scout/client';
import fetch, { RequestInfo, RequestInit } from 'node-fetch';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import z from 'zod';
import { logger } from './logger';

const DHI_DISCLAIMER = `Docker Hardened Images are available for organizations entitled to DHIs.If you're interested in accessing Docker Hardened Images, please visit:
https://www.docker.com/products/hardened-images/`;

export class ScoutAPI extends Asset {
    private scoutClient: ScoutClient;
    constructor(
        private server: McpServer,
        config: AssetConfig
    ) {
        super(config);
        this.scoutClient = new ScoutClient({
            url: 'https://api.scout.docker.com/v1/graphql',
            headers: {
                'Content-Type': 'application/json',
            },
            fetchFn: async (input: RequestInfo | URL, init?: RequestInit) => {
                const headers = {
                    ...init?.headers,
                    'Content-Type': 'application/json',
                };
                const token = await this.authenticate();
                (headers as Record<string, string>)['Authorization'] = `Bearer ${token}`;
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
        this.tools.set(
            'docker-hardened-images',
            this.server.registerTool(
                'docker-hardened-images',
                {
                    description:
                        'Docker Hardened Images (DHI) API. This API is used to query for mirrored DHIs in the namespace. It lists all the secure, minimal, production ready images available to get near-zero CVEs and enterprise-grade SLA.',
                    inputSchema: z.object({
                        namespace: z
                            .string()
                            .describe(
                                'The organisation for which a DHI is queried for. Required to be input by the user.'
                            ),
                    }).shape,
                    annotations: {
                        title: 'List available Docker Hardened Images',
                    },
                },
                async ({ namespace }) => {
                    logger.info(`Querying for mirrored DHI images for organization: ${namespace}`);
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
                        logger.error(
                            `Error querying for mirrored DHI images: ${JSON.stringify(errors)}`
                        );
                        return {
                            content: [
                                { type: 'text', text: JSON.stringify(errors, null, 2) },
                                {
                                    type: 'text',
                                    text: DHI_DISCLAIMER,
                                },
                            ],
                            isError: true,
                        };
                    }
                    if (data.dhiListMirroredRepositories.mirroredRepositories.length === 0) {
                        logger.info(`No mirrored DHI images found for organization: ${namespace}`);
                        return {
                            content: [
                                {
                                    type: 'text',
                                    text: `There are no mirrored DHI images for the organization '${namespace}'. Could you try again by providing a different organization entitled to DHIs?`,
                                },
                                {
                                    type: 'text',
                                    text: DHI_DISCLAIMER,
                                },
                            ],
                        };
                    }
                    logger.info(
                        `Found ${data.dhiListMirroredRepositories.mirroredRepositories.length} mirrored DHI images for organization: ${namespace}`
                    );
                    return {
                        content: [
                            {
                                type: 'text',
                                text: `Here are the mirrored DHI images for the organization '${namespace}':\n\n${JSON.stringify(
                                    data.dhiListMirroredRepositories.mirroredRepositories,
                                    null,
                                    2
                                )}`,
                            },
                            {
                                type: 'text',
                                text: DHI_DISCLAIMER,
                            },
                        ],
                    };
                }
            )
        );
    }
}
