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
import { createPaginatedResponseSchema } from './types';
import { CallToolResult } from '@modelcontextprotocol/sdk/types';
import { jwtDecode, JwtPayload } from 'jwt-decode';

//#region  Types
const namespace = z.object({
    id: z.string().describe('The ID of the namespace'),
    uuid: z.string().describe('The UUID of the namespace'),
    orgname: z.string().describe('The name of the org which is also the namespace name'),
    full_name: z.string().describe('The full name of the org'),
    location: z.string().describe('The location of the org'),
    company: z.string().describe('The company of the org'),
    profile_url: z.string().describe('The profile URL of the org'),
    date_joined: z.string().describe('The date joined of the namespace'),
    gravatar_email: z.string().describe('The gravatar email of the namespace'),
    gravatar_url: z.string().describe('The gravatar URL of the namespace'),
    type: z.string().describe('The type of the namespace'),
    badge: z.string().describe('The badge of the namespace'),
    is_active: z.boolean().describe('Whether the namespace is active'),
    user_role: z.string().describe('The user role of the namespace'),
    user_groups: z.array(z.string()).describe('The user groups of the namespace'),
    org_groups_count: z.number().describe('The number of org groups of the namespace'),
    plan_name: z.string().nullable().describe('The plan name of the namespace'),
    parent_name: z.string().nullable().describe('The parent name of the namespace'),
});

const namespacePaginatedResponseSchema = createPaginatedResponseSchema(namespace);
export type NamespacePaginatedResponse = z.infer<typeof namespacePaginatedResponseSchema>;
//#endregion

export class Accounts extends Asset {
    constructor(
        private server: McpServer,
        config: AssetConfig
    ) {
        super(config);
    }

    RegisterTools(): void {
        this.tools.set(
            'listNamespaces',
            this.server.registerTool(
                'listNamespaces',
                {
                    description: 'List paginated namespaces',
                    inputSchema: {
                        page: z
                            .number()
                            .optional()
                            .describe('The page number to list repositories from'),
                        page_size: z
                            .number()
                            .optional()
                            .describe('The page size to list repositories from'),
                    },
                    outputSchema: namespacePaginatedResponseSchema.shape,
                    annotations: {
                        title: 'List Namespaces',
                    },
                    title: 'List organisations (namespaces) the user has access to',
                },
                this.listNamespaces.bind(this)
            )
        );
        this.tools.set(
            'getPersonalNamespace',
            this.server.registerTool(
                'getPersonalNamespace',
                {
                    description: 'Get the personal namespace name',
                    annotations: {
                        title: 'Get Personal Namespace',
                    },
                    title: 'Get user personal namespace',
                },
                this.getPersonalNamespace.bind(this)
            )
        );
        this.tools.set(
            'listAllNamespacesMemberOf',
            this.server.registerTool(
                'listAllNamespacesMemberOf',
                {
                    description: 'List all namespaces the user is a member of',
                    annotations: {
                        title: 'List All Namespaces user is a member of',
                    },
                    title: 'List all organisations (namespaces) the user is a member of including personal namespace',
                },
                () => {
                    return {
                        content: [
                            {
                                type: 'text',
                                text: "To get all namespaces the user is a member of, call the 'listNamespaces' tool and the 'getPersonalNamespace' tool to get the personal namespace name.",
                            },
                        ],
                    };
                }
            )
        );
    }

    private async listNamespaces({
        page,
        page_size,
    }: {
        page?: number;
        page_size?: number;
    }): Promise<CallToolResult> {
        if (!page) {
            page = 1;
        }
        if (!page_size) {
            page_size = 10;
        }
        const url = `${this.config.host}/user/orgs?page=${page}&page_size=${page_size}`;

        return this.callAPI<NamespacePaginatedResponse>(
            url,
            { method: 'GET' },
            `Here are the namespaces (Note: this list does not include the personal namespace): :response`,
            `Error getting repositories for ${namespace}`
        );
    }

    private async getPersonalNamespace(): Promise<CallToolResult> {
        try {
            const token = await this.authenticate();
            const jwt = jwtDecode<
                JwtPayload & {
                    'https://hub.docker.com': {
                        username: string;
                    };
                }
            >(token);
            const dockerData = jwt['https://hub.docker.com'];
            const username = dockerData.username;
            return {
                content: [{ type: 'text', text: `The personal namespace is ${username}` }],
            };
        } catch (error) {
            return {
                content: [
                    {
                        type: 'text',
                        text: `Error getting personal namespace: ${error}. Please provide the name of the personal namespace.`,
                        isError: true,
                    },
                ],
            };
        }
    }
}
