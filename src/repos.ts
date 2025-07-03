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
import { logger } from './logger';

//#region  Types
// all items in the types are optional and nullable because structured content is always evaluated even when an error occurs.
// See https://github.com/modelcontextprotocol/typescript-sdk/issues/654
const Repository = z.object({
    name: z.string().optional().nullable().describe('The name of the repository'),
    namespace: z.string().optional().nullable().describe('The namespace of the repository'),
    repository_type: z
        .nativeEnum({ 0: 'image', 1: 'docker engine plugin' })
        .nullable()
        .optional()
        .describe('The type of the repository'),
    full_description: z
        .string()
        .nullable()
        .optional()
        .describe('The full description of the repository'),
    immutable_tags_settings: z
        .object({
            enabled: z.boolean().describe('Whether the repository has immutable tags'),
            rules: z.array(z.string()).describe('The rules of the immutable tags'),
        })
        .optional()
        .nullable()
        .describe('The immutable tags settings of the repository'),
    is_private: z.boolean().optional().nullable().describe('Whether the repository is private'),
    status: z.number().optional().nullable().describe('The status of the repository'),
    status_description: z
        .string()
        .optional()
        .nullable()
        .describe('The status description of the repository'),
    description: z.string().optional().nullable().describe('The description of the repository'),
    star_count: z.number().optional().nullable().describe('The number of stars the repository has'),
    pull_count: z.number().optional().nullable().describe('The number of pulls the repository has'),
    last_updated: z
        .string()
        .optional()
        .nullable()
        .describe('The last updated date of the repository'),
    last_modified: z
        .string()
        .nullable()
        .optional()
        .describe('The last modified date of the repository'),
    date_registered: z
        .string()
        .optional()
        .nullable()
        .describe('The date the repository was registered'),
    affiliation: z.string().optional().nullable().describe('The affiliation of the repository'),
    media_types: z
        .array(z.string())
        .optional()
        .nullable()
        .describe('The media types of the repository'),
    content_types: z
        .array(z.string())
        .optional()
        .nullable()
        .describe('The content types of the repository'),
    categories: z
        .array(
            z.object({
                name: z.string().describe('The name of the category'),
                slug: z.string().describe('The slug of the category in search engine'),
            })
        )
        .optional()
        .nullable()
        .describe('The categories of the repository'),
    storage_size: z
        .number()
        .nullable()
        .optional()
        .nullable()
        .describe('The storage size of the repository'),
    user: z.string().optional().nullable().describe('The user of the repository'),
    hub_user: z.string().optional().nullable().describe('The repository username on hub'),
    has_starred: z
        .boolean()
        .optional()
        .nullable()
        .describe('Whether the user has starred the repository'),
    is_automated: z.boolean().optional().nullable().describe('Whether the repository is automated'),
    collaborator_count: z
        .number()
        .optional()
        .nullable()
        .describe(
            "The number of collaborators on the repository. Only valid when repository_type is 'User'"
        ),
    permissions: z
        .object({
            read: z.boolean().describe('if user can read and pull from repository'),
            write: z.boolean().describe('if user can update and push to repository'),
            admin: z.boolean().describe('if user is an admin of the repository'),
        })
        .optional()
        .nullable(),
    error: z.string().optional().nullable(),
});

const CreateRepositoryRequest = z.object({
    namespace: z.string().describe('The namespace of the repository. Required.'),
    name: z
        .string()
        .default('')
        .describe(
            'The name of the repository (required). Must contain a combination of alphanumeric characters and may contain the special characters ., _, or -. Letters must be lowercase.'
        ),
    description: z.string().optional().describe('The description of the repository'),
    is_private: z.boolean().optional().describe('Whether the repository is private'),
    full_description: z
        .string()
        .max(25000)
        .optional()
        .describe('A detailed description of the repository'),
    registry: z.string().optional().describe('The registry to create the repository in'),
});

const repositoryPaginatedResponseSchema = createPaginatedResponseSchema(Repository);
export type RepositoryPaginatedResponse = z.infer<typeof repositoryPaginatedResponseSchema>;

const RepositoryTag = z.object({
    id: z.number().optional().nullable().describe('The tag ID'),
    images: z
        .array(
            z.object({
                architecture: z.string().describe('The architecture of the tag'),
                features: z.string().describe('The features of the tag'),
                variant: z.string().optional().nullable().describe('The variant of the tag'),
                digest: z.string().nullable().describe('image layer digest'),
                layers: z
                    .array(
                        z.object({
                            digest: z.string().describe('The digest of the layer'),
                            size: z.number().describe('The size of the layer'),
                            instruction: z.string().describe('Dockerfile instruction'),
                        })
                    )
                    .optional(),
                os: z.string().nullable().describe('operating system of the tagged image'),
                os_features: z
                    .string()
                    .nullable()
                    .describe('features of the operating system of the tagged image'),
                os_version: z
                    .string()
                    .nullable()
                    .describe('version of the operating system of the tagged image'),
                size: z.number().describe('size of the image'),
                status: z.enum(['active', 'inactive']).describe('status of the image'),
                last_pulled: z.string().nullable().describe('datetime of last pull'),
                last_pushed: z.string().nullable().describe('datetime of last push'),
            })
        )
        .optional()
        .nullable(),
    creator: z.number().optional().nullable().describe('ID of the user that pushed the tag'),
    last_updated: z.string().optional().nullable().describe('The last updated date of the tag'),
    last_updater: z
        .number()
        .optional()
        .nullable()
        .describe('ID of the last user that updated the tag'),
    last_updater_username: z
        .string()
        .optional()
        .nullable()
        .describe('Hub username of the user that updated the tag'),
    name: z.string().optional().nullable().describe('The name of the tag'),
    repository: z.number().optional().nullable().describe('The repository ID'),
    full_size: z
        .number()
        .optional()
        .nullable()
        .describe('compressed size (sum of all layers) of the tagged image'),
    v2: z.boolean().optional().nullable().describe('Repository API version'),
    tag_status: z
        .enum(['active', 'inactive'])
        .optional()
        .nullable()
        .describe('whether a tag has been pushed to or pulled in the past month'),
    tag_last_pulled: z.string().optional().nullable().describe('datetime of last pull'),
    tag_last_pushed: z.string().optional().nullable().describe('datetime of last push'),
    media_type: z.string().optional().nullable().describe('media type of this tagged artifact'),
    content_type: z
        .enum(['image', 'plugin', 'helm', 'volume', 'wasm', 'compose', 'unrecognized', 'model'])
        .optional()
        .nullable()
        .describe(
            "Content type of a tagged artifact based on it's media type. unrecognized means the media type is unrecognized by Docker Hub."
        ),
    digest: z.string().optional().nullable().describe('The digest of the tag'),
    error: z.string().optional().nullable(),
});
const repositoryTagPaginatedResponseSchema = createPaginatedResponseSchema(RepositoryTag);
export type RepositoryTagPaginatedResponse = z.infer<typeof repositoryTagPaginatedResponseSchema>;
//#endregion

export class Repos extends Asset {
    constructor(
        private server: McpServer,
        config: AssetConfig
    ) {
        super(config);
    }

    RegisterTools(): void {
        // List Repositories by Namespace
        this.tools.set(
            'listRepositoriesByNamespace',
            this.server.registerTool(
                'listRepositoriesByNamespace',
                {
                    description: 'List paginated repositories by namespace',
                    inputSchema: {
                        namespace: z.string().describe('The namespace to list repositories from'),
                        page: z
                            .number()
                            .optional()
                            .describe('The page number to list repositories from'),
                        page_size: z
                            .number()
                            .optional()
                            .describe('The page size to list repositories from'),
                        ordering: z
                            .enum([
                                'last_updated',
                                '-last_updated',
                                'name',
                                '-name',
                                'pull_count',
                                '-pull_count',
                            ])
                            .optional()
                            .describe(
                                'The ordering of the repositories. Use "-" to reverse the ordering. For example, "last_updated" will order the repositories by last updated in descending order while "-last_updated" will order the repositories by last updated in ascending order.'
                            ),
                        media_types: z
                            .string()
                            .optional()
                            .default('')
                            .describe(
                                'Comma-delimited list of media types. Only repositories containing one or more artifacts with one of these media types will be returned. Default is empty to get all repositories.'
                            ),
                        content_types: z
                            .string()
                            .optional()
                            .default('')
                            .describe(
                                'Comma-delimited list of content types. Only repositories containing one or more artifacts with one of these content types will be returned. Default is empty to get all repositories.'
                            ),
                    },
                    outputSchema: repositoryPaginatedResponseSchema.shape,
                    annotations: {
                        title: 'List Repositories by Namespace',
                    },
                    title: 'List Repositories by Organisation (namespace)',
                },
                this.listRepositoriesByNamespace.bind(this)
            )
        );
        // Create Repository
        this.tools.set(
            'createRepository',
            this.server.registerTool(
                'createRepository',
                {
                    description:
                        'Create a new repository in the given namespace. You MUST ask the user for the repository name and if the repository has to be public or private. Can optionally pass a description.\nIMPORTANT: Before calling this tool, you must ensure you have:\n - The repository name (name).',
                    inputSchema: CreateRepositoryRequest.shape,
                    outputSchema: Repository.shape,
                    annotations: {
                        title: 'Create Repository in namespace',
                    },
                    title: 'Create a repository in organisation (namespace) or personal namespace',
                },
                this.createRepository.bind(this)
            )
        );
        // Get Repository Info
        this.tools.set(
            'getRepositoryInfo',
            this.server.registerTool(
                'getRepositoryInfo',
                {
                    description: 'Get the details of a repository in the given namespace.',
                    inputSchema: z.object({
                        namespace: z
                            .string()
                            .describe(
                                'The namespace of the repository (required). If not provided the `library` namespace will be used for official images.'
                            ),
                        repository: z.string().describe('The repository name (required)'),
                    }).shape,
                    outputSchema: Repository.shape,
                    annotations: {
                        title: 'Get Repository Info',
                    },
                    title: 'Get Repository Details',
                },
                this.getRepositoryInfo.bind(this)
            )
        );

        // Update Repository Info
        this.tools.set(
            'updateRepositoryInfo',
            this.server.registerTool(
                'updateRepositoryInfo',
                {
                    description:
                        'Update the details of a repository in the given namespace. Description, overview and status are the only fields that can be updated. While description and overview changes are fine, a status change is a dangerous operation so the user must explicitly ask for it.',
                    inputSchema: z.object({
                        namespace: z
                            .string()
                            .describe('The namespace of the repository (required)'),
                        repository: z.string().describe('The repository name (required)'),
                        description: z
                            .string()
                            .optional()
                            .describe(
                                'The description of the repository. If user asks for updating the description of the repository, this is the field that should be updated.'
                            ),
                        full_description: z
                            .string()
                            .max(25000)
                            .optional()
                            .describe(
                                'The full description (overview)of the repository. If user asks for updating the full description or the overview of the repository, this is the field that should be updated. '
                            ),
                        status: z
                            .enum(['active', 'inactive'])
                            .optional()
                            .nullable()
                            .describe(
                                'The status of the repository. If user asks for updating the status of the repository, this is the field that should be updated. This is a dangerous operation and should be done with caution so user must be prompted to confirm the operation. Valid status are `active` (1) and `inactive` (0). Normally do not update the status if it is not strictly required by the user. It is not possible to change an `inactive` repository to `active` if it has no images.'
                            ),
                    }).shape,
                    outputSchema: Repository.shape,
                    annotations: {
                        title: 'Get Repository Info',
                    },
                    title: 'Update Repository Details',
                },
                this.updateRepositoryInfo.bind(this)
            )
        );

        // Check Repository Exists
        this.tools.set(
            'checkRepository',
            this.server.registerTool(
                'checkRepository',
                {
                    description: 'Check if a repository exists in the given namespace.',
                    inputSchema: z.object({ namespace: z.string(), repository: z.string() }).shape,
                    annotations: {
                        title: 'Check Repository Exists',
                    },
                    title: 'Check Repository Exists',
                },
                this.checkRepository.bind(this)
            )
        );

        // List Repository Tags
        this.tools.set(
            'listRepositoryTags',
            this.server.registerTool(
                'listRepositoryTags',
                {
                    description: 'List paginated tags by repository',
                    inputSchema: z.object({
                        namespace: z
                            .string()
                            .optional()
                            .describe(
                                "The namespace of the repository. If not provided the 'library' namespace will be used for official images."
                            ),
                        repository: z.string().describe('The repository to list tags from'),
                        page: z.number().optional().describe('The page number to list tags from'),
                        page_size: z
                            .number()
                            .optional()
                            .describe('The page size to list tags from'),
                        architecture: z
                            .string()
                            .optional()
                            .describe(
                                'The architecture to list tags from. If not provided, all architectures will be listed.'
                            ),
                        os: z
                            .string()
                            .optional()
                            .describe(
                                'The operating system to list tags from. If not provided, all operating systems will be listed.'
                            ),
                    }).shape,
                    outputSchema: repositoryTagPaginatedResponseSchema.shape,
                    annotations: {
                        title: 'List Repository Tags',
                    },
                    title: 'List tags by repository',
                },
                this.listRepositoryTags.bind(this)
            )
        );

        // Get Repository Tag
        this.tools.set(
            'getRepositoryTag',
            this.server.registerTool(
                'getRepositoryTag',
                {
                    description:
                        'Get the details of a tag in a repository. It can be use to show the latest tag details for example.',
                    inputSchema: z.object({
                        namespace: z.string(),
                        repository: z.string(),
                        tag: z.string(),
                    }).shape,
                    outputSchema: RepositoryTag.shape,
                    annotations: {
                        title: 'Get Repository Tag',
                    },
                    title: 'Get Repository Tag Details',
                },
                this.getRepositoryTag.bind(this)
            )
        );
        // Check Repository Tag
        this.tools.set(
            'checkRepositoryTag',
            this.server.registerTool(
                'checkRepositoryTag',
                {
                    description: 'Check if a tag exists in a repository',
                    inputSchema: z.object({
                        namespace: z.string(),
                        repository: z.string(),
                        tag: z.string(),
                    }).shape,
                    annotations: {
                        title: 'Check Repository Tag',
                    },
                    title: 'Check Repository Tag Exists',
                },
                this.checkRepositoryTag.bind(this)
            )
        );
    }

    private async listRepositoriesByNamespace({
        namespace,
        page,
        page_size,
        ordering,
        media_types,
        content_types,
    }: {
        namespace: string;
        page?: number;
        page_size?: number;
        ordering?: string;
        media_types?: string;
        content_types?: string;
    }): Promise<CallToolResult> {
        if (!namespace) {
            throw new Error('Namespace is required');
        }
        if (!page) {
            page = 1;
        }
        if (!page_size) {
            page_size = 10;
        }
        let url = `${this.config.host}/namespaces/${namespace}/repositories?page=${page}&page_size=${page_size}`;
        if (ordering) {
            url += `&ordering=${ordering}`;
        }
        if (media_types) {
            url += `&media_types=${media_types}`;
        }
        if (content_types) {
            url += `&content_types=${content_types}`;
        }

        return this.callAPI<RepositoryPaginatedResponse>(
            url,
            { method: 'GET' },
            `Here are the repositories for ${namespace}: :response`,
            `Error getting repositories for ${namespace}`
        );
    }

    private async listRepositoryTags({
        repository,
        namespace,
        page,
        page_size,
        architecture,
        os,
    }: {
        repository: string;
        namespace?: string;
        page?: number;
        page_size?: number;
        architecture?: string;
        os?: string;
    }): Promise<CallToolResult> {
        if (!namespace) {
            namespace = 'library';
        }
        if (!page) {
            page = 1;
        }
        if (!page_size) {
            page_size = 10;
        }
        let url = `${this.config.host}/namespaces/${namespace}/repositories/${repository}/tags`;
        const params: Record<string, string> = {};
        if (architecture) {
            params.architecture = architecture;
        }
        if (os) {
            params.os = os;
        }
        if (Object.keys(params).length > 0) {
            url += `?${new URLSearchParams(params).toString()}`;
        }

        return this.callAPI<RepositoryTagPaginatedResponse>(
            url,
            { method: 'GET' },
            `Here are the tags for ${namespace}/${repository}: :response`,
            `Error getting tags for ${namespace}/${repository}. Maybe you did not provide the right namespace or repository name.`
        );
    }

    private async createRepository(
        request: z.infer<typeof CreateRepositoryRequest>
    ): Promise<CallToolResult> {
        // sometimes the mcp client tries to pass a default repository name. Fail in this case.
        if (!request.name || request.name === 'new-repository') {
            logger.error('Repository name is required.');
            throw new Error('Repository name is required.');
        }
        const url = `${this.config.host}/namespaces/${request.namespace}/repositories`;
        return this.callAPI<z.infer<typeof Repository>>(
            url,
            { method: 'POST', body: JSON.stringify(request) },
            `Repository ${request.name} created successfully. You can access it at https://hub.docker.com/r/${request.namespace}/${request.name}. \n :response`,
            `Error creating repository ${request.name}`
        );
    }

    private async getRepositoryInfo({
        namespace,
        repository,
    }: {
        namespace: string;
        repository: string;
    }): Promise<CallToolResult> {
        if (!namespace || !repository) {
            logger.error('Namespace and repository name are required');
            throw new Error('Namespace and repository name are required');
        }
        logger.info(`Getting info for repository ${repository} in ${namespace}`);
        const url = `${this.config.host}/namespaces/${namespace}/repositories/${repository}`;

        const response = await this.callAPI<z.infer<typeof Repository>>(
            url,
            { method: 'GET' },
            `Here are the details of the repository :${repository} in ${namespace}. :response`,
            `Error getting repository info for ${repository} in ${namespace}`
        );
        if (namespace === 'library') {
            response.content.push({
                type: 'text',
                text: `This is an official image from Docker Hub. You can access it at https://hub.docker.com/_/${repository}.\nIf you did not ask for an official image, please call this tool again and clearly specify a namespace.`,
            });
        }
        return response;
    }

    private async updateRepositoryInfo({
        namespace,
        repository,
        description,
        full_description,
        status,
    }: {
        namespace: string;
        repository: string;
        description?: string;
        full_description?: string;
        status?: string | null;
    }): Promise<CallToolResult> {
        const extraContent: { type: 'text'; text: string }[] = [];
        if (!namespace || !repository) {
            throw new Error('Namespace and repository name are required');
        }
        logger.info(
            `Updating repository ${repository} in ${namespace} with description: ${description}, full_description: ${full_description}, status: ${status}`
        );
        const url = `${this.config.host}/namespaces/${namespace}/repositories/${repository}`;
        const body: { description?: string; full_description?: string; status?: number } = {};
        if (description && description !== '') {
            body.description = description;
        }
        if (full_description && full_description !== '') {
            body.full_description = full_description;
        }
        if (status !== undefined) {
            // get current repository info to check if a status change is needed
            const currentRepository = await this.getRepositoryInfo({ namespace, repository });
            if (currentRepository.isError) {
                logger.error(`Error getting repository info for ${repository} in ${namespace}`);
                return {
                    isError: true,
                    content: [
                        {
                            type: 'text',
                            text: `Error getting repository info for ${repository} in ${namespace}`,
                        },
                    ],
                };
            }
            const currentStatus = (
                currentRepository.structuredContent as z.infer<typeof Repository>
            ).status;
            if (currentStatus !== status) {
                logger.info(
                    `Repository ${repository} in ${namespace} is currently in status ${currentStatus}. Updating to ${status}.`
                );
                if (status === 'active') {
                    return {
                        isError: true,
                        content: [
                            {
                                type: 'text',
                                text: `Repository ${repository} in ${namespace} is currently inactive. It is not possible to change an inactive repository to active if it has no images. If you did not ask for updating the status of the repository, please call this tool again and specifically ask for updating only the description or the overview of the repository.`,
                            },
                        ],
                        structuredContent: {
                            error: `Repository ${repository} in ${namespace} is currently inactive. It is not possible to change an inactive repository to active if it has no images. If you did not ask for updating the status of the repository, please call this tool again and specifically ask for updating only the description or the overview of the repository.`,
                        },
                    };
                }
                body.status = status === 'active' ? 1 : 0;
                extraContent.push({
                    type: 'text',
                    text: `Requested a status change from ${currentStatus} to ${status}. This is potentially a dangerous operation and should be done with caution. If you are not sure, please go on Docker Hub and revert the status manually.\nhttps://hub.docker.com/r/${namespace}/${repository}`,
                });
            }
        }
        const response = await this.callAPI<z.infer<typeof Repository>>(
            url,
            { method: 'PATCH', body: JSON.stringify(body) },
            `Repository ${repository} updated successfully. :response`,
            `Error updating repository ${repository}`
        );
        if (extraContent.length > 0) {
            response.content = [...response.content, ...extraContent];
        }
        return response;
    }

    private async getRepositoryTag({
        namespace,
        repository,
        tag,
    }: {
        namespace: string;
        repository: string;
        tag: string;
    }): Promise<CallToolResult> {
        if (!namespace || !repository || !tag) {
            throw new Error('Namespace, repository name and tag are required');
        }
        const url = `${this.config.host}/namespaces/${namespace}/repositories/${repository}/tags/${tag}`;

        return this.callAPI<z.infer<typeof RepositoryTag>>(
            url,
            { method: 'GET' },
            `Here are the details of the tag :${tag} in ${namespace}/${repository}. :response`,
            `Error getting repository info for ${repository} in ${namespace}`
        );
    }

    private async checkRepository({
        namespace,
        repository,
    }: {
        namespace: string;
        repository: string;
    }): Promise<CallToolResult> {
        if (!namespace || !repository) {
            throw new Error('Namespace and repository name are required');
        }
        const url = `${this.config.host}/namespaces/${namespace}/repositories/${repository}`;

        return this.callAPI(
            url,
            { method: 'HEAD' },
            `Repository :${repository} in ${namespace} exists.`,
            `Repository :${repository} in ${namespace} does not exist.`
        );
    }

    private async checkRepositoryTag({
        namespace,
        repository,
        tag,
    }: {
        namespace: string;
        repository: string;
        tag: string;
    }): Promise<CallToolResult> {
        if (!namespace || !repository || !tag) {
            throw new Error('Namespace, repository name and tag are required');
        }
        const url = `${this.config.host}/namespaces/${namespace}/repositories/${repository}/tags/${tag}`;

        return this.callAPI(
            url,
            { method: 'HEAD' },
            `Repository :${repository} in ${namespace} contains tag ${tag}.`,
            `Repository :${repository} in ${namespace} does not contain tag ${tag}.`
        );
    }
}
