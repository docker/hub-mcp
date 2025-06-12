# Docker Hub MCP Server

## Build

```
npm install
npm run build
```

## Run in inspector

```
npx @modelcontextprotocol/inspector -e HUB_USERNAME=<your-dockerhub-username> -e HUB_PAT_TOKEN=<your-dockerhub-pat-token> node dist/index.js
```

## Gordon instructions

1. Replace environment in the `gordon-mcp.yml` file with your Docker Hub username and a PAT token.

```
services:
  hub:
    image: hub
    environment:
      - HUB_USERNAME=<your-dockerhub-username>
      - HUB_PAT_TOKEN=<your-dockerhub-pat-token>
```

2. Run `docker build -t hub .`
3. Run `docker ai`
