# CLAUDE.md — Docker Hub MCP Server

This file provides guidance for AI assistants working in this codebase.

## Project Overview

The **Docker Hub MCP Server** is a TypeScript/Node.js implementation of the [Model Context Protocol (MCP)](https://modelcontextprotocol.io) that exposes Docker Hub APIs as MCP tools. LLM clients (Claude Desktop, VS Code, Docker Ask Gordon, etc.) connect to this server to search for images, manage repositories, inspect tags, and query Docker Scout for hardened images.

- **License:** Apache 2.0
- **Node.js requirement:** `>=22`
- **Primary language:** TypeScript (strict mode)
- **MCP transport options:** stdio (default) and HTTP (Streamable HTTP)

---

## Repository Structure

```
hub-mcp/
├── src/                        # All TypeScript source code
│   ├── index.ts                # CLI entry point — parses args, starts server
│   ├── server.ts               # HubMCPServer class, Express routes, MCP setup
│   ├── asset.ts                # Abstract base class for all API integrations
│   ├── repos.ts                # Repository tools (CRUD, tags) — largest module
│   ├── accounts.ts             # Namespace/account tools
│   ├── search.ts               # Docker Hub search tools
│   ├── scout.ts                # Docker Scout / Hardened Images tools
│   ├── types.ts                # Shared Zod schemas (paginated responses)
│   ├── logger.ts               # Winston logger config
│   └── scout/
│       ├── client.ts           # GraphQL client for Scout API
│       └── genql/              # Auto-generated GraphQL client (do not edit)
│   └── scripts/
│       └── toolsList.ts        # CLI script to validate/update tools.json
├── .github/
│   ├── workflows/
│   │   ├── lint.yml            # ESLint + Prettier check on PRs
│   │   ├── release.yml         # Docker multi-platform image build & push
│   │   ├── scorecard.yml       # OpenSSF security scorecard
│   │   └── tools-list.yml      # Validates tools.json consistency on PRs
│   └── pull_request_template.md
├── docs/
│   └── proxmox-setup.md        # Infrastructure documentation
├── proxmox/                    # Proxmox VE infrastructure-as-code scripts
├── tools.json                  # Generated tool definitions (194 KB, do not edit manually)
├── tools.txt                   # Human-readable tools summary (generated)
├── Dockerfile                  # Multi-stage build: builder → slim runtime image
├── package.json
├── tsconfig.json
├── eslint.config.mjs
└── .prettierrc.json
```

---

## Development Commands

```bash
# Install dependencies
npm ci

# Build TypeScript → dist/
npm run build

# Start the server (stdio transport)
npm start

# Start with HTTP transport on port 3000
node dist/index.js --transport=http --port=3000

# Development: watch mode with MCP Inspector
npm run inspect

# Linting and formatting
npm run lint
npm run format:check
npm run format:fix

# Validate tools.json is up to date
npm run list-tools:check

# Regenerate tools.json
npm run list-tools:update

# Regenerate Scout GraphQL client
npm run genql.scout
```

---

## Architecture: How Tools Are Registered

All API integrations follow a common pattern via the `Asset` abstract base class (`src/asset.ts`):

1. **`Asset` base class** — provides `authFetch()`, `callAPI()`, and `authenticate()` methods. Handles both Bearer token and PAT (Personal Access Token with JWT) auth with automatic token refresh.

2. **Concrete Asset subclasses** — `Repos`, `Accounts`, `Search`, `ScoutAPI` each extend `Asset` and implement `RegisterTools()` to register MCP tools with the `McpServer` instance.

3. **`HubMCPServer`** (`src/server.ts`) — instantiates all four assets, calls `asset.RegisterTools()` for each, and manages transport (stdio or HTTP).

4. **`index.ts`** — parses CLI flags (`--transport`, `--port`, `--username`) and the `HUB_PAT_TOKEN` env var, then calls `new HubMCPServer(username, patToken).run(port, transport)`.

### Adding a New Tool

1. Add your tool in the appropriate Asset class (or create a new one extending `Asset`).
2. Register it inside `RegisterTools()` using `this.server.tool(...)`.
3. Use `this.callAPI(url, options, outMsg, errMsg, unAuthMsg)` to make authenticated requests.
4. Define Zod schemas for inputs/outputs in `types.ts` or co-located in the module.
5. Run `npm run list-tools:update` to regenerate `tools.json` and `tools.txt`.
6. Update `README.md` with tool documentation and examples.

---

## Available MCP Tools (13 total)

| Tool | Asset class | Description |
|------|-------------|-------------|
| `listRepositoriesByNamespace` | Repos | List repos with pagination & filtering |
| `createRepository` | Repos | Create a new repository |
| `getRepositoryInfo` | Repos | Get repository details |
| `updateRepositoryInfo` | Repos | Update repository metadata |
| `checkRepository` | Repos | Check if a repository exists |
| `listRepositoryTags` | Repos | List tags with arch/OS filtering |
| `getRepositoryTag` | Repos | Get a specific tag |
| `checkRepositoryTag` | Repos | Check if a tag exists |
| `listNamespaces` | Accounts | List organizations with pagination |
| `getPersonalNamespace` | Accounts | Get user's personal namespace |
| `listAllNamespacesMemberOf` | Accounts | List all accessible namespaces |
| `search` | Search | Search Docker Hub (images, plugins, extensions) |
| `dockerHardenedImages` | ScoutAPI | Query mirrored Docker Hardened Images |

---

## Authentication

- **`HUB_PAT_TOKEN`** (env var) — Docker Hub Personal Access Token. Required for write operations and authenticated access.
- **`--username`** (CLI flag) — Docker Hub username. Required for PAT-based auth.
- **`Search` asset** — unauthenticated; does not require credentials.
- PAT authentication exchanges the token for a short-lived JWT via `POST /v2/users/login`, then caches it per-username with automatic expiry detection and re-authentication.

---

## Code Style & Conventions

- **TypeScript strict mode** — no implicit `any`, all types must be explicit.
- **Prettier** — enforced; settings in `.prettierrc.json`: 4-space tabs, single quotes, semi-colons, 100-char line width, LF line endings.
- **ESLint** — `eslint.config.mjs` with TypeScript-ESLint recommended rules.
- **Always run before committing:**
  ```bash
  npm run lint
  npm run format:fix
  ```
- **Zod schemas** — use Zod for all API request/response validation; define schemas close to where they're used or in `types.ts` for shared schemas.
- **Logging** — use the `logger` from `src/logger.ts` (Winston). Never use `console.log` in production paths; `console.error` is used only in `authenticate()` for debug tracing.
- **Error handling** — `callAPI()` catches all errors and returns an MCP `CallToolResult` with `isError: true`. Do not throw from tool handlers.
- **User-Agent** — always include `'User-Agent': 'DockerHub-MCP-Server/1.0.0'` in API request headers (set in `authFetch()` by default).

---

## Git & Pull Request Conventions

- Branch names: `<issue-number>-short-description` (e.g., `42-add-webhooks-tool`)
- Commit messages: capitalized, imperative mood, max 50 chars summary, optional body after blank line
- Sign-off required: `git commit -s` (Developer Certificate of Origin)
- Squash commits into logical units before opening a PR (`git rebase -i`)
- Always rebase on base branch, never merge: `git rebase main`
- Include `Closes #XXXX` or `Fixes #XXXX` in PR descriptions
- Fill out the PR template (`.github/pull_request_template.md`) completely

---

## CI/CD Workflows

| Workflow | Trigger | What it does |
|----------|---------|--------------|
| `lint.yml` | Pull requests | `npm ci && npm run lint && npm run format:check` |
| `tools-list.yml` | Pull requests | `npm run list-tools:check` — validates tools.json is current |
| `release.yml` | Push to main / manual | Builds multi-platform Docker image (amd64 + arm64), pushes to Docker Hub |
| `scorecard.yml` | Scheduled | OpenSSF security scorecard analysis |

**All CI checks must pass before merging a PR.**

---

## Docker Build

Multi-stage Dockerfile:
1. **Builder stage** — `node:current-alpine3.22`, runs `npm ci` + `npm run build`
2. **Runtime stage** — `node:current-alpine3.22`, copies `dist/` + production `node_modules`, runs as non-root `appuser`

```bash
# Build image locally
docker build -t hub-mcp .

# Run with stdio transport (for MCP clients)
docker run -e HUB_PAT_TOKEN=<token> hub-mcp --username=<user>

# Run with HTTP transport
docker run -p 3000:3000 -e HUB_PAT_TOKEN=<token> hub-mcp --transport=http --username=<user>
```

---

## Key Files to Know

| File | Purpose |
|------|---------|
| `src/asset.ts` | Base class — understand this before adding any new tools |
| `src/repos.ts` | Largest module (757 LOC) — reference for tool implementation patterns |
| `src/server.ts` | Entry point for transport setup and asset wiring |
| `tools.json` | **Generated** — never edit manually; regenerate with `npm run list-tools:update` |
| `src/scout/genql/` | **Generated** — never edit; regenerate with `npm run genql.scout` |

---

## Testing

There are no automated unit tests in this project. Testing is done via:

- **MCP Inspector**: `npm run inspect` — starts the server in watch mode with the MCP Inspector UI
- **Manual testing** with MCP clients (Claude Desktop, VS Code, Docker Ask Gordon)
- **tools.json validation**: `npm run list-tools:check` — ensures tool definitions are consistent

When contributing a new tool, include screenshots from the MCP Inspector or an MCP client in your PR.

---

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `HUB_PAT_TOKEN` | For auth | Docker Hub Personal Access Token |
| `NODE_ENV` | No | `production` enables file logging to `/app/logs`; otherwise console logging |

---

## Proxmox Infrastructure

The `proxmox/` directory contains infrastructure-as-code for a Proxmox VE homelab cluster (unrelated to the MCP server itself). See `docs/proxmox-setup.md` for details. These scripts manage VM creation, GPU passthrough, networking, file sharing, and automated backups.
