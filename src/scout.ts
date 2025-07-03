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
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import z from 'zod';
import { logger } from './logger';
import { CallToolResult } from '@modelcontextprotocol/sdk/types.js';
const DHI_DISCLAIMER = `Docker Hardened Images are available for organizations entitled to DHIs. If you're interested in accessing Docker Hardened Images, please visit:
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
            fetchFn: async (input: Request | URL, init?: RequestInit) => {
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
                logger.error(`❌ Scout API error: ${error.message}`);
                if (onErrorCallback) {
                    onErrorCallback();
                }
            },
        });
    }
    RegisterTools(): void {
        this.tools.set(
            'dockerHardenedImages',
            this.server.registerTool(
                'dockerHardenedImages',
                {
                    description:
                        'This API is used to list Docker Hardened Images (DHIs) available in the user organisations. The tool takes the organisation name as input and returns the list of DHI images available in the organisation. It depends on the "listNamespaces" tool to be called first to get the list of organisations the user has access to.',
                    inputSchema: z.object({
                        organisation: z
                            .string()
                            .describe(
                                'The organisation for which the DHIs are listed for. If user does not explicitly ask for a specific organisation, the "listNamespaces" tool should be called first to get the list of organisations the user has access to.'
                            ),
                    }).shape,
                    annotations: {
                        title: 'List available Docker Hardened Images',
                    },
                    title: 'List available Docker Hardened Images in user organisations',
                },
                this.dhis.bind(this)
            )
        );
    }
    private async dhis({ organisation }: { organisation: string }): Promise<CallToolResult> {
        logger.info(`Querying for mirrored DHI images for organization: ${organisation}`);
        const { data, errors } = await this.scoutClient.query({
            dhiListMirroredRepositories: {
                __args: {
                    context: { organization: organisation },
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
        if (errors && errors.length > 0) {
            const error = errors[0];
            if (error.extensions?.status?.toString().includes('FORBIDDEN')) {
                return {
                    content: [
                        {
                            type: 'text',
                            text: `You are not authorised to fetch DHIs for the organisation: ${organisation}. Please provide another organisation name.`,
                        },
                    ],
                    isError: true,
                };
            }
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

        if (data.dhiListMirroredRepositories?.mirroredRepositories?.length === 0) {
            logger.info(`No mirrored DHI images found for organization: ${organisation}`);
            return {
                content: [
                    {
                        type: 'text',
                        text: `There are no mirrored DHI images for the organization '${organisation}'. Could you try again by providing a different organization entitled to DHIs?`,
                    },
                    {
                        type: 'text',
                        text: DHI_DISCLAIMER,
                    },
                ],
            };
        }
        logger.info(
            `Found ${data.dhiListMirroredRepositories?.mirroredRepositories?.length} mirrored DHI images for organization: ${organisation}`
        );
        return {
            content: [
                {
                    type: 'text',
                    text: `Here are the mirrored DHI images for the organization '${organisation}':\n\n${JSON.stringify(
                        data.dhiListMirroredRepositories?.mirroredRepositories,
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
}
