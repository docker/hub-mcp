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

import { McpServer } from '@modelcontextprotocol/sdk/server/mcp';
import { Asset, AssetConfig } from './asset';
import { z } from 'zod';
import { CallToolResult } from '@modelcontextprotocol/sdk/types';
import { logger } from './logger';

//#region  Types
const searchResult = z.object({
    id: z.string().describe('The id of the repository'),
    name: z.string().describe('The name of the repository in the format of namespace/repository'),
    slug: z.string().describe('The slug of the repository'),
    type: z
        .enum(['image', 'plugin', 'extension'])
        .describe('The type of the repository. Can be "image", "plugin" or "extension"'),
    publisher: z.object({
        id: z.string().describe('The id of the publisher'),
        name: z.string().describe('The name of the publisher'),
    }),
    created_at: z.string().describe('The date and time the repository was created'),
    updated_at: z.string().describe('The date and time the repository was last updated'),
    short_description: z.string().describe('The short description of the repository'),
    badge: z
        .enum(['official', 'verified_publisher', 'open_source', 'none'])
        .nullable()
        .describe(
            "The badge of the repository. If the repository is from community publisher, the badge is either 'none' or null."
        ),
    star_count: z.number().describe('The number of stars the repository has'),
    pull_count: z.string().describe('The number of pulls the repository has'),
    operating_systems: z.array(
        z.object({
            name: z.string().describe('The name of the operating system'),
            label: z.string().describe('The label of the operating system'),
        })
    ),
    architectures: z.array(
        z.object({
            name: z.string().describe('The name of the architecture'),
            label: z.string().describe('The label of the architecture'),
        })
    ),
    logo_url: z
        .object({
            large: z.string().nullable().optional().describe('The URL of the large logo'),
            small: z.string().nullable().optional().describe('The URL of the small logo'),
        })
        .optional()
        .nullable(),
    extension_reviewed: z.boolean().describe('Whether the repository is reviewed'),
    categories: z.array(
        z.object({
            slug: z.string().describe('The slug of the category'),
            name: z.string().describe('The name of the category'),
        })
    ),
    archived: z.boolean().describe('Whether the repository is archived'),
});

const searchResults = z.object({
    total: z.number().optional().describe('The total number of repositories found'),
    results: z.array(searchResult).optional().describe('The repositories found'),
    error: z.string().optional().nullable(),
});

//#endregion

export class Search extends Asset {
    constructor(
        private server: McpServer,
        config: AssetConfig
    ) {
        super(config);
    }

    RegisterTools(): void {
        this.tools.set(
            'search',
            this.server.registerTool(
                'search',
                {
                    description:
                        'Search for repositories in Docker Hub. It sorts results by best match if no sort criteria is provided. If user asks for secure, production-ready images the "dockerHardenedImages" tool should be called first to get the list of DHI images available in the user organisations (if any) and fallback to search tool if no DHI images are available or user is not authenticated.',
                    inputSchema: {
                        query: z.string().describe('The query to search for'),
                        badges: z
                            .array(z.enum(['official', 'verified_publisher', 'open_source']))
                            .optional()
                            .describe('The trusted content to search for'),
                        type: z
                            .string()
                            .optional()
                            .describe('The type of the repository to search for'),
                        categories: z
                            .array(z.string())
                            .optional()
                            .describe('The categories names to filter search results'),
                        architectures: z
                            .array(z.string())
                            .optional()
                            .describe('The architectures to filter search results'),
                        operating_systems: z
                            .array(z.string())
                            .optional()
                            .describe('The operating systems to filter search results'),
                        extension_reviewed: z
                            .boolean()
                            .optional()
                            .describe(
                                'Whether to filter search results to only include reviewed extensions'
                            ),
                        from: z.number().optional().describe('The number of repositories to skip'),
                        size: z
                            .number()
                            .optional()
                            .describe('The number of repositories to return'),
                        sort: z
                            .enum(['pull_count', 'updated_at'])
                            .optional()
                            .nullable()
                            .describe(
                                'The criteria to sort the search results by. If the `sort` field is not set, the best match is used by default. When search extensions, documents are sort alphabetically if none is provided. Do not use it unless user explicitly asks for it.'
                            ),
                        order: z
                            .enum(['asc', 'desc'])
                            .optional()
                            .nullable()
                            .describe('The order to sort the search results by'),
                        images: z
                            .array(z.string())
                            .optional()
                            .describe('The images to filter search results'),
                    },
                    outputSchema: searchResults.shape,
                    annotations: {
                        title: 'Search Repositories',
                    },
                    title: 'Search Repositories',
                },
                this.search.bind(this)
            )
        );
    }

    private async search(request: {
        query: string;
        badges?: string[];
        type?: string;
        categories?: string[];
        architectures?: string[];
        operating_systems?: string[];
        extension_reviewed?: boolean;
        from?: number;
        size?: number;
        sort?: 'pull_count' | 'updated_at' | null;
        order?: 'asc' | 'desc' | null;
        images?: string[];
    }): Promise<CallToolResult> {
        logger.info(`Searching for repositories with request: ${JSON.stringify(request)}`);
        let url = `${this.config.host}/v4?custom_boosted_results=true`;
        if (!request.query) {
            return {
                content: [{ type: 'text', text: 'Please provide a query to search for' }],
                structuredContent: {},
                isError: true,
            };
        }
        const queryParams = new URLSearchParams();
        for (const key in request) {
            const param = key as keyof typeof request;
            switch (param) {
                case 'badges':
                case 'categories':
                case 'architectures':
                case 'operating_systems':
                case 'images': {
                    if (request[param] && request[param].length > 0) {
                        queryParams.set(param, request[param].join(','));
                    }
                    break;
                }
                case 'query':
                case 'type':
                case 'order':
                case 'sort':
                case 'from':
                case 'size': {
                    if (
                        request[param] !== undefined &&
                        request[param] !== null &&
                        request[param] !== ''
                    ) {
                        queryParams.set(param, request[param].toString());
                        logger.info(`Setting parameter: ${param} to ${request[param]}`);
                    }
                    break;
                }
                case 'extension_reviewed': {
                    if (request[param]) {
                        queryParams.set(param, 'true');
                    }
                    break;
                }
                default: {
                    logger.warn(`Unknown parameter: ${param}`);
                    break;
                }
            }
        }
        if (queryParams.size > 0) {
            url += `&${queryParams.toString()}`;
        }
        const response = await this.callAPI<typeof searchResults>(
            url,
            { method: 'GET' },
            `Here are the search results: :response`,
            `Error finding repositories for query: ${request.query}`
        );
        // let's try to find if the query is an exact match
        if (!response.isError) {
            if (response.structuredContent) {
                try {
                    const results = searchResults.parse(response.structuredContent).results;
                    if (results && results.length > 0) {
                        const [namespace, repository] = results[0].name.split('/');
                        if (
                            !namespace.toLowerCase().includes(request.query.toLowerCase()) ||
                            (repository &&
                                !repository.toLowerCase().includes(request.query.toLowerCase()))
                        ) {
                            return {
                                content: [
                                    {
                                        type: 'text',
                                        text: `We could not find any repository exactly matching '${request.query}'. However we found some repositories that might be relevant.`,
                                    },
                                    ...response.content,
                                ],
                                structuredContent: response.structuredContent,
                            };
                        }
                    }
                } catch (error) {
                    logger.error(`Error parsing search results: ${error}`);
                    // return the original response if we can't parse the results
                    return response;
                }
            }
        }
        return response;
    }
}
