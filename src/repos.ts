import { McpServer } from "@modelcontextprotocol/sdk/server/mcp";
import { Asset, AssetConfig } from "./asset";
import { z } from "zod";
import { createPaginatedResponseSchema } from "./types";
import { CallToolResult } from "@modelcontextprotocol/sdk/types";

//#region  Types
const Repository = z.object({
  name: z.string().describe("The name of the repository"),
  namespace: z.string().describe("The namespace of the repository"),
  repository_type: z
    .nativeEnum({ 0: "image", 1: "docker engine plugin" })
    .nullable()
    .optional()
    .describe("The type of the repository"),
  is_private: z.boolean().describe("Whether the repository is private"),
  status: z.number().describe("The status of the repository"),
  status_description: z
    .string()
    .describe("The status description of the repository"),
  description: z.string().describe("The description of the repository"),
  star_count: z.number().describe("The number of stars the repository has"),
  pull_count: z.number().describe("The number of pulls the repository has"),
  last_updated: z.string().describe("The last updated date of the repository"),
  last_modified: z
    .string()
    .describe("The last modified date of the repository"),
  date_registered: z
    .string()
    .describe("The date the repository was registered"),
  affiliation: z.string().describe("The affiliation of the repository"),
  media_types: z
    .array(z.string())
    .describe("The media types of the repository"),
  content_types: z
    .array(z.string())
    .describe("The content types of the repository"),
  categories: z
    .array(
      z.object({
        name: z.string().describe("The name of the category"),
        slug: z.string().describe("The slug of the category in search engine"),
      })
    )
    .describe("The categories of the repository"),
  storage_size: z
    .number()
    .nullable()
    .optional()
    .describe("The storage size of the repository"),
  user: z.string().optional().nullable().describe("The user of the repository"),
  hub_user: z
    .string()
    .optional()
    .nullable()
    .describe("The repository username on hub"),
  has_starred: z
    .boolean()
    .optional()
    .nullable()
    .describe("Whether the user has starred the repository"),
  is_automated: z
    .boolean()
    .optional()
    .nullable()
    .describe("Whether the repository is automated"),
  collaborator_count: z
    .number()
    .optional()
    .nullable()
    .describe(
      "The number of collaborators on the repository. Only valid when repository_type is 'User'"
    ),
  permissions: z
    .object({
      read: z.boolean().describe("if user can read and pull from repository"),
      write: z.boolean().describe("if user can update and push to repository"),
      admin: z.boolean().describe("if user is an admin of the repository"),
    })
    .optional(),
});

const CreateRepositoryRequest = z.object({
  namespace: z.string().describe("The namespace of the repository"),
  name: z
    .string()
    .describe(
      "The name of the repository. Must contain a combination of alphanumeric characters and may contain the special characters ., _, or -. Letters must be lowercase"
    ),
  description: z
    .string()
    .optional()
    .describe("The description of the repository"),
  is_private: z
    .boolean()
    .optional()
    .describe("Whether the repository is private"),
  full_description: z
    .string()
    .max(25000)
    .optional()
    .describe("A detailed description of the repository"),
  registry: z
    .string()
    .optional()
    .describe("The registry to create the repository in"),
});

const repositoryPaginatedResponseSchema =
  createPaginatedResponseSchema(Repository);
export type RepositoryPaginatedResponse = z.infer<
  typeof repositoryPaginatedResponseSchema
>;

const RepositoryTag = z.object({
  id: z.number().describe("The tag ID"),
  images: z.array(
    z.object({
      architecture: z.string().describe("The architecture of the tag"),
      features: z.string().describe("The features of the tag"),
      variant: z.string().describe("The variant of the tag"),
      digest: z.string().nullable().describe("image layer digest"),
      layers: z
        .array(
          z.object({
            digest: z.string().describe("The digest of the layer"),
            size: z.number().describe("The size of the layer"),
            instruction: z.string().describe("Dockerfile instruction"),
          })
        )
        .optional(),
      os: z
        .string()
        .nullable()
        .describe("operating system of the tagged image"),
      os_features: z
        .string()
        .nullable()
        .describe("features of the operating system of the tagged image"),
      os_version: z
        .string()
        .nullable()
        .describe("version of the operating system of the tagged image"),
      size: z.number().describe("size of the image"),
      status: z.enum(["active", "inactive"]).describe("status of the image"),
      last_pulled: z.string().nullable().describe("datetime of last pull"),
      last_pushed: z.string().nullable().describe("datetime of last push"),
    })
  ),
  creator: z.number().describe("ID of the user that pushed the tag"),
  last_updated: z.string().describe("The last updated date of the tag"),
  last_updater: z.number().describe("ID of the last user that updated the tag"),
  last_updater_username: z
    .string()
    .describe("Hub username of the user that updated the tag"),
  name: z.string().describe("The name of the tag"),
  repository: z.number().describe("The repository ID"),
  full_size: z
    .number()
    .describe("compressed size (sum of all layers) of the tagged image"),
  v2: z.boolean().describe("Repository API version"),
  tag_status: z
    .enum(["active", "inactive"])
    .optional()
    .nullable()
    .describe("whether a tag has been pushed to or pulled in the past month"),
  tag_last_pulled: z.string().nullable().describe("datetime of last pull"),
  tag_last_pushed: z.string().nullable().describe("datetime of last push"),
  media_type: z.string().describe("media type of this tagged artifact"),
  content_type: z
    .enum(["image", "plugin", "helm", "volume", "wasm", "unrecognized"])
    .describe(
      "Content type of a tagged artifact based on it's media type. unrecognized means the media type is unrecognized by Docker Hub."
    ),
  digest: z.string().describe("The digest of the tag"),
});
const repositoryTagPaginatedResponseSchema =
  createPaginatedResponseSchema(RepositoryTag);
export type RepositoryTagPaginatedResponse = z.infer<
  typeof repositoryTagPaginatedResponseSchema
>;
//#endregion

export class Repos extends Asset {
  constructor(private server: McpServer, config: AssetConfig) {
    super(config);
  }

  RegisterTools(): void {
    // List Repositories by Namespace
    this.server.registerTool(
      "listRepositoriesByNamespace",
      {
        description: "List paginated repositories by namespace",
        inputSchema: {
          namespace: z
            .string()
            .describe("The namespace to list repositories from"),
          page: z
            .number()
            .optional()
            .describe("The page number to list repositories from"),
          page_size: z
            .number()
            .optional()
            .describe("The page size to list repositories from"),
        },
        outputSchema: repositoryTagPaginatedResponseSchema,
        annotations: {
          title: "List Repositories by Namespace",
        },
      },
      this.listRepositoriesByNamespace.bind(this)
    );

    // Create Repository
    this.server.registerTool(
      "createRepository",
      {
        description: "Create a new repository in the given namespace.",
        inputSchema: CreateRepositoryRequest.shape,
        outputSchema: Repository.shape,
        annotations: {
          title: "Create Repository",
        },
      },
      this.createRepository.bind(this)
    );

    // Get Repository Info
    this.server.registerTool(
      "getRepositoryInfo",
      {
        description: "Get the details of a repository in the given namespace.",
        inputSchema: z.object({ namespace: z.string(), repository: z.string() })
          .shape,
        outputSchema: Repository.shape,
        annotations: {
          title: "Get Repository Info",
        },
      },
      this.getRepositoryInfo.bind(this)
    );

    // Check Repository Exists
    this.server.registerTool(
      "checkRepository",
      {
        description: "Check if a repository exists in the given namespace.",
        inputSchema: z.object({ namespace: z.string(), repository: z.string() })
          .shape,
        annotations: {
          title: "Check Repository Exists",
        },
      },
      this.checkRepository.bind(this)
    );

    // List Repository Tags
    this.server.registerTool(
      "listRepositoryTags",
      {
        description: "List paginated tags by repository",
        inputSchema: z.object({
          namespace: z.string(),
          repository: z.string(),
          page: z.number().optional(),
          page_size: z.number().optional(),
          architecture: z.string().optional(),
          os: z.string().optional(),
        }).shape,
        outputSchema: repositoryTagPaginatedResponseSchema.shape,
        annotations: {
          title: "List Repository Tags",
        },
      },
      this.listRepositoryTags.bind(this)
    );

    // Check Repository Tags
    this.server.registerTool(
      "checkRepositoryTags",
      {
        description: "Check if a repository contains tags",
        inputSchema: z.object({
          namespace: z.string(),
          repository: z.string(),
        }).shape,
        annotations: {
          title: "Check Repository Tags",
        },
      },
      this.checkRepositoryTags.bind(this)
    );

    // Get Repository Tag
    this.server.registerTool(
      "getRepositoryTag",
      {
        description: "Get the details of a tag in a repository",
        inputSchema: z.object({
          namespace: z.string(),
          repository: z.string(),
          tag: z.string(),
        }).shape,
        outputSchema: RepositoryTag.shape,
        annotations: {
          title: "Get Repository Tag",
        },
      },
      this.getRepositoryTag.bind(this)
    );
    // Check Repository Tag
    this.server.registerTool(
      "checkRepositoryTag",
      {
        description: "Check if a tag exists in a repository",
        inputSchema: z.object({
          namespace: z.string(),
          repository: z.string(),
          tag: z.string(),
        }).shape,
        annotations: {
          title: "Check Repository Tag",
        },
      },
      this.checkRepositoryTag.bind(this)
    );
  }

  private async listRepositoriesByNamespace({
    namespace,
    page,
    page_size,
  }: {
    namespace: string;
    page?: number;
    page_size?: number;
  }): Promise<CallToolResult> {
    if (!namespace) {
      throw new Error("Namespace is required");
    }
    if (!page) {
      page = 1;
    }
    if (!page_size) {
      page_size = 10;
    }
    const url = `${this.config.host}/namespaces/${namespace}/repositories?page=${page}&page_size=${page_size}`;

    return this.callAPI<RepositoryPaginatedResponse>(
      url,
      { method: "GET" },
      `Here are the repositories for ${namespace}: :response`,
      `Error getting repositories for ${namespace}`
    );
  }

  private async listRepositoryTags({
    namespace,
    repository,
    page,
    page_size,
    architecture,
    os,
  }: {
    namespace: string;
    repository: string;
    page?: number;
    page_size?: number;
    architecture?: string;
    os?: string;
  }): Promise<CallToolResult> {
    if (!namespace) {
      throw new Error("Namespace is required");
    }
    if (!page) {
      page = 1;
    }
    if (!page_size) {
      page_size = 10;
    }
    let url = `${this.config.host}/namespaces/${namespace}/repositories/${repository}/tags`;
    if (architecture) {
      url += `?architecture=${architecture}`;
    }
    if (os) {
      url += `?os=${os}`;
    }

    return this.callAPI<RepositoryTagPaginatedResponse>(
      url,
      { method: "GET" },
      `Here are the tags for ${namespace}/${repository}: :response`,
      `Error getting tags for ${namespace}/${repository}`
    );
  }

  private async createRepository(
    request: z.infer<typeof CreateRepositoryRequest>
  ): Promise<CallToolResult> {
    const url = `${this.config.host}/namespaces/${request.namespace}/repositories`;
    return this.callAPI<z.infer<typeof Repository>>(
      url,
      { method: "POST", body: JSON.stringify(request) },
      `Repository ${request.name} created successfully. :response`,
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
      throw new Error("Namespace and repository name are required");
    }
    const url = `${this.config.host}/namespaces/${namespace}/repositories/${repository}`;

    return this.callAPI<z.infer<typeof Repository>>(
      url,
      { method: "GET" },
      `Here are the details of the repository :${repository} in ${namespace}. :response`,
      `Error getting repository info for ${repository} in ${namespace}`
    );
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
      throw new Error("Namespace, repository name and tag are required");
    }
    const url = `${this.config.host}/namespaces/${namespace}/repositories/${repository}/tags/${tag}`;

    return this.callAPI<z.infer<typeof RepositoryTag>>(
      url,
      { method: "GET" },
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
      throw new Error("Namespace and repository name are required");
    }
    const url = `${this.config.host}/namespaces/${namespace}/repositories/${repository}`;

    return this.callAPI<z.infer<typeof Repository>>(
      url,
      { method: "HEAD" },
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
      throw new Error("Namespace, repository name and tag are required");
    }
    const url = `${this.config.host}/namespaces/${namespace}/repositories/${repository}/tags/${tag}`;

    return this.callAPI<z.infer<typeof Repository>>(
      url,
      { method: "HEAD" },
      `Repository :${repository} in ${namespace} contains tag :${tag}.`,
      `Repository :${repository} in ${namespace} does not contain tag :${tag}.`
    );
  }

  private async checkRepositoryTags({
    namespace,
    repository,
  }: {
    namespace: string;
    repository: string;
  }): Promise<CallToolResult> {
    if (!namespace || !repository) {
      throw new Error("Namespace and repository name are required");
    }
    const url = `${this.config.host}/namespaces/${namespace}/repositories/${repository}/tags`;

    return this.callAPI<z.infer<typeof Repository>>(
      url,
      { method: "HEAD" },
      `Repository :${repository} in ${namespace} contains tags.`,
      `Repository :${repository} in ${namespace} does not contain tags.`
    );
  }
}
