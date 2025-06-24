# Docker Hub MCP Server

## Build

```
npm install
npm run build
```

## Run

```
npm start -- [--transport=http|stdio] [--port=3000]
```
### Default args:
* `port=3000`
* `transport=stdio`

### Run in inspector

```
npx @modelcontextprotocol/inspector -e node dist/index.js -- [--transport=http|stdio] [--port=3000]
```

## Authenticate with docker
By default this MCP server can only query public content on Docker Hub. In order to manage your repositories you need to provide authentication.

```
HUB_PAT_TOKEN=<a_pat_token> npm start -- [--username=<the_hub_username_for_the_pat>]
```

```
HUB_PAT_TOKEN=<a_pat_token> npx @modelcontextprotocol/inspector -e node dist/index.js -- [--username=<the_hub_username_for_the_pat>]
```


## Gordon instructions

1. Replace environment in the `gordon-mcp.yml` file with your Docker Hub username and a PAT token.

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
