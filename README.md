# Docker Hub MCP Server

The Docker Hub MCP Server is a [Model Context Protocol (MCP)](https://modelcontextprotocol.io/introduction) server that interfaces with Docker Hub APIs to make them accessible to LLMs, enabling intelligent content discovery and repository management.

Developers building with containers, especially in AI and LLM-powered workflows, often face inadequate context across the vast landscape of Docker Hub images. As a result, LLMs struggle to recommend the right images, and developers lose time manually searching instead of building.

<p align="center">
  <img src="hubmcp.gif" 
       alt="Demo"
       width="50%" 
       style="border: 1px solid #ccc; border-radius: 8px;" />
</p>

### Use Cases

- AI-powered image recommendations - LLMs access real-time Docker Hub data for accurate container image suggestions.
- Enhanced content discovery - AI tools help developers find the right images faster.
- Simplified Hub workflows - Manage Docker repositories and images using natural language.

## Prerequisites

- [Docker](https://docs.docker.com/get-docker/) installed
- [Node.js](https://nodejs.org/) (version 22+)
- [Optional] A [Docker Personal Access Token (PAT)](https://docs.docker.com/security/for-developers/access-tokens/) with appropriate permissions

## Setup

1. **Build**

    ```bash
    npm install
    npm run build
    ```

2. **Run**

    ```bash
     npm start -- [--transport=http|stdio] [--port=3000]
    ```

- Default args:
  - `transport`: Choose between `http` or `stdio` (default: `stdio`)
  - `port=3000`
    This starts the server with default settings and can only access public Docker Hub content.

### Run in inspector [Optional]

The MCP Inspector provides a web interface to test your server:

```
npx @modelcontextprotocol/inspector node dist/index.js [--transport=http|stdio] [--port=3000]
```

## Authenticate with docker

By default this MCP server can only query public content on Docker Hub. In order to manage your repositories you need to provide authentication.

### Run with authentication

```
HUB_PAT_TOKEN=<a_pat_token> npm start -- [--username=<the_hub_username_for_the_pat>]
```

### Run in inspector [Optional]

```
HUB_PAT_TOKEN=<a_pat_token> npx @modelcontextprotocol/inspector node dist/index.js[--username=<the_hub_username_for_the_pat>]
```
## Usage in Docker Ask Gordon
You can configure Gordon to be a host that can interact with the Docker Hub MCP server.

### Gordon Setup

[Ask Gordon](https://docs.docker.com/ai/gordon/) is your personal AI assistant embedded in Docker Desktop and the Docker CLI. It's designed to streamline your workflow and help you make the most of the Docker ecosystem.

You can configure Gordon to be a client that can interact with the Docker Hub MCP server.

1. Create the [`gordon-mcp.yml` file](https://docs.docker.com/ai/gordon/mcp/yaml/) file in your working directory.
2. Replace environment variables in the `gordon-mcp.yml`  with your Docker Hub username and a PAT token.

```
services:
  hub:
    image: hub
    environment:
      - HUB_PAT_TOKEN=<your_pat_token>
    command:
      - --username=<your_hub_username>
```

2. Run `docker build -t hub .`
3. Run `docker ai`

## Usage in other MCP Clients

### Usage with Claude Desktop

> NOTE: Make sure you have already built the application as mentioned in Step 1.

1. Add the Docker Hub MCP Server configuration to your `claude_desktop_config.json`:

> NOTE: if you are using [nvm](https://github.com/nvm-sh/nvm) to manage node versions, you should put the node binary path in the `command` property. This ensure MCP server runs with the right node version. You can find your binary path by running `which node` in your shell

#### For public repositories only:

- `/FULL/PATH/TO/YOUR/docker-hub-mcp-server` - The complete path to where you cloned this repository

```json
{
    "mcpServers": {
        "docker-hub": {
            "command": "node", // or absoulute binary path
            "args": ["/FULL/PATH/TO/YOUR/docker-hub-mcp-server/dist/index.js", "--transport=stdio"]
        }
    }
}
```

#### For authenticated access (recommended):

Replace the following values:

- `YOUR_DOCKER_HUB_USERNAME` - Your Docker Hub username
- `YOUR_DOCKER_HUB_PERSONAL_ACCESS_TOKEN` - Your Docker Hub Personal Access Token
- `/FULL/PATH/TO/YOUR/docker-hub-mcp-server` - The complete path to where you cloned this

```json
{
    "mcpServers": {
        "docker-hub": {
            "command": "node",
            "args": [
                "/FULL/PATH/TO/YOUR/docker-hub-mcp-server/dist/index.js",
                "--transport=stdio",
                "--username=YOUR_DOCKER_HUB_USERNAME"
            ],
            "env": {
                "HUB_PAT_TOKEN": "YOUR_DOCKER_HUB_PERSONAL_ACCESS_TOKEN"
            }
        }
    }
}
```

2. Save the configuration file and completely restart Claude Desktop for the changes to take effect.

## Usage with VS Code

1. Add the Docker Hub MCP Server configuration to your User Settings (JSON) file in VS Code. You can do this by opening the `Command Palette` and typing `Preferences: Open User Settings (JSON)`.

#### For public repositories only:

- `/FULL/PATH/TO/YOUR/docker-hub-mcp-server` - The complete path to where you cloned this repository

```json
{
    "mcpServers": {
        "docker-hub": {
            "command": "node",
            "args": ["/FULL/PATH/TO/YOUR/docker-hub-mcp-server/dist/index.js", "--transport=stdio"]
        }
    }
}
```

#### For authenticated access (recommended):

Replace the following values:

- `YOUR_DOCKER_HUB_USERNAME` - Your Docker Hub username
- `YOUR_DOCKER_HUB_PERSONAL_ACCESS_TOKEN` - Your Docker Hub Personal Access Token
- `/FULL/PATH/TO/YOUR/docker-hub-mcp-server` - The complete path to where you cloned this

```json
{
    "mcpServers": {
        "docker-hub": {
            "command": "node",
            "args": [
                "/FULL/PATH/TO/YOUR/docker-hub-mcp-server/dist/index.js",
                "--transport=stdio",
                "--username=YOUR_DOCKER_HUB_USERNAME"
            ],
            "env": {
                "HUB_PAT_TOKEN": "YOUR_DOCKER_HUB_PERSONAL_ACCESS_TOKEN"
            }
        }
    }
}
```

2. Open the `Command Palette` and type `MCP: List Servers`.
3. Select `docker-hub` and select `Start Server`.

## Task Examples

### Finding images

```console
# Search for official images
$ docker ai "Search for official nginx images on Docker Hub"

# Search for lightweight images to reduce deployment size and improve performance
$ docker ai "Search for minimal Node.js images with small footprint"

# Get the most recent tag of a base image
$ docker ai "Show me the latest tag details for go"

# Find a production-ready database with enterprise features and reliability
$ docker ai "Search for production ready database images"

# Compare Ubuntu versions to choose the right one for my project
$ docker ai "Help me find the right Ubuntu version for my project"
```

### Repository Management

```console
# Create a repository
$ docker ai "Create a repository in my namespace"

# List all repositories in my namespace
$ docker ai "List all repositories in my namespace"

# Find the largest repository in my namespace
$ docker ai "Which of my repositories takes up the most space?"

# Find repositories that haven't been updated recently
$ docker ai "Which of my repositories haven't had any pushes in the last 60 days?"

# Find which repositories are currently active and being used
$ docker ai "Show me my most recently updated repositories"

# Get details about a repository
$ docker ai "Show me information about my '<repository-name>' repository"
```

### Pull/Push Images

```console
# Pull latest PostgreSQL version
$ docker ai "Pull the latest postgres image"

# Push image to your Docker Hub repository
$ docker ai "Push my <image-name> to my <repository-name> repository"
```

### Tag Management

```console
# List all tags for a repository
$ $ docker ai "Show me all tags for my '<repository-name>' repository"

# Find the most recently pushed tag
$ docker ai "What's the most recent tag pushed to my '<repository-name>' repository?"

# List tags with architecture filtering
$ docker ai "List tags for in the '<repository-name>' repository that support amd64 architecture"

# Get detailed information about a specific tag
$ docker ai "Show me details about the '<tag-name>' tag in the '<repository-name>' repository"

# Check if a specific tag exists
$ docker ai "Check if version 'v1.2.0' exists for my 'my-web-app' repository"
```

### Docker Hardened Images

```console
# List available hardened images
$ docker ai "What is the most secure image I can use to run a node.js application?"

# Convert Dockerfile to use a hardened image
$ docker ai "Can you help me update my Dockerfile to use a docker hardened image instead of the current one"
```

## Tools

### Search

- **search** - Search repositories and content using Search V4 API
    - `query`: Search query parameter (string, required)
    - `architectures`: Filter on architectures (string, optional)
    - `badges`: Filter by image content type badges (string, optional)
    - `categories`: Filter on categories (string, optional)
    - `extension_reviewed`: Filter on reviewed extensions (boolean, optional)
    - `from`: Number of documents to skip for pagination (number, optional)
    - `images`: Filter on image names (string, optional)
    - `operating_systems`: Filter on operating systems (string, optional)
    - `order`: Change the ordering of results (string, optional)
    - `size`: Maximum number of results to return (number, optional)
    - `sort`: Sort results by search field (string, optional)
    - `type`: Filter on repository content type (string, optional)

### Namespace Management

- **get_namespaces** - Get list of namespaces the user is a member of
    - `page`: Page number for pagination (string, optional)
    - `page_size`: Number of items per page (string, optional)

### Repository Management

- **list_repositories_by_namespace** - List all repositories under the provided namespace
    - `namespace`: Repository namespace (string, required)
    - `content_types`: Comma-delimited list of content types (string, optional)
    - `media_types`: Comma-delimited list of media types (string, optional)
    - `name`: Search by repository name (string, optional)
    - `ordering`: Sort order (string, optional)
    - `page`: Page number (number, optional)
    - `page_size`: Number of items per page (number, optional)

- **get_repository_info** - Get information about a repository
    - `namespace`: Repository namespace (string, required)
    - `repository`: Repository name (string, required)

- **check_repository** - Check if a repository exists
    - `namespace`: Repository namespace (string, required)
    - `repository`: Repository name (string, required)

- **check_repository_tag** - Check if a specific tag exists in a repository
    - `namespace`: Repository namespace (string, required)
    - `repository`: Repository name (string, required)
    - `tag`: Tag name (string, required)

- **create_repository** - Create a new repository in the provided namespace
    - `namespace`: Repository namespace (string, required)
    - `body`: Request body data (object, optional)

- **update_repository_info** - Update repository information
    - `namespace`: Repository namespace (string, required)
    - `repository`: Repository name (string, required)
    - `body`: Request body data (object, optional)

### Tag Management

- **list_repository_tags** - List all tags for a repository
    - `namespace`: Repository namespace (string, required)
    - `repository`: Repository name (string, required)
    - `architecture`: Filter by architecture (string, optional)
    - `os`: Filter by operating system (string, optional)
    - `page`: Page number (number, optional)
    - `page_size`: Number of items per page (number, optional)
- **read_repository_tag** - Get details of a specific repository tag
    - `namespace`: Repository namespace (string, required)
    - `repository`: Repository name (string, required)
    - `tag`: Tag name (string, required)

### Hardened Images

- **docker_hardened_images** - Query for mirrored Docker Hardened Images (DHI) in the namespace
    - `namespace`: The namespace to query for mirrored hardened repositories (string, optional)

## Licensing

[docker/hub-mcp](https://github.com/docker/hub-mcp) is licensed under the Apache License, Version 2.0. See
[LICENSE](https://github.com/docker/docker/blob/master/LICENSE) for the full
license text.
