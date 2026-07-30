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
import { logger } from './logger';
import { HubMCPServer } from './server';

const DEFAULT_PORT = 3000;
// Bind to loopback by default so the HTTP transport is not exposed to the
// network unless the operator explicitly opts in with --host. See RG-4626.
const DEFAULT_HOST = '127.0.0.1';
const STDIO_OPTION = 'stdio';

function parseTransportFlag(args: string[]): string {
    const transportArg = args.find((arg) => arg.startsWith('--transport='))?.split('=')[1];
    if (!transportArg) {
        logger.info(`transport unspecified, defaulting to ${STDIO_OPTION}`);
        return STDIO_OPTION;
    }

    return transportArg;
}

function parseUsernameFlag(args: string[]): string | undefined {
    const usernameArg = args.find((arg) => arg.startsWith('--username='))?.split('=')[1];
    if (!usernameArg) {
        logger.info('username unspecified');
        return undefined;
    }

    return usernameArg;
}

function parsePortFlag(args: string[]): number {
    const portArg = args.find((arg) => arg.startsWith('--port='))?.split('=')[1];
    if (!portArg || portArg.length === 0) {
        logger.info(`port unspecified, defaulting to ${DEFAULT_PORT}`);
        return DEFAULT_PORT;
    }

    const portParsed = parseInt(portArg, 10);
    if (isNaN(portParsed)) {
        logger.info(`invalid port specified, defaulting to ${DEFAULT_PORT}`);
        return DEFAULT_PORT;
    }

    return portParsed;
}

function parseHostFlag(args: string[]): string {
    const hostArg = args.find((arg) => arg.startsWith('--host='))?.split('=')[1];
    if (!hostArg || hostArg.length === 0) {
        logger.info(`host unspecified, defaulting to ${DEFAULT_HOST}`);
        return DEFAULT_HOST;
    }

    return hostArg;
}

function parseBooleanFlag(args: string[], name: string): boolean {
    return args.includes(`--${name}`);
}

function parseListFlag(args: string[], name: string): string[] {
    const value = args.find((arg) => arg.startsWith(`--${name}=`))?.split('=')[1];
    if (!value) {
        return [];
    }

    return value
        .split(',')
        .map((entry) => entry.trim())
        .filter((entry) => entry.length > 0);
}

// Main execution
async function main() {
    const args = process.argv.slice(2);
    logger.info(args.length > 0 ? `provided arguments: ${args}` : 'no arguments provided');
    const transportArg = parseTransportFlag(args);
    const port = parsePortFlag(args);
    const username = parseUsernameFlag(args);
    const patToken = process.env.HUB_PAT_TOKEN;

    const server = new HubMCPServer(username, patToken);
    // Start the server
    await server.run(port, transportArg, {
        host: parseHostFlag(args),
        // The bearer token clients must present on the HTTP transport. Read from
        // the environment (not argv) so it is not exposed via the process table.
        authToken: process.env.MCP_AUTH_TOKEN,
        allowUnauthenticated: parseBooleanFlag(args, 'allow-unauthenticated'),
        allowedHosts: parseListFlag(args, 'allowed-hosts'),
        allowedOrigins: parseListFlag(args, 'allowed-origins'),
    });
    logger.info('🚀 dockerhub mcp server is running...');
}

process.on('unhandledRejection', (error) => {
    logger.info(`unhandled rejection: ${error}`);
    process.exit(1);
});

main().catch((error) => {
    const message = error instanceof Error ? error.message : String(error);
    // Write synchronously to stderr as well: the logger's transports flush
    // asynchronously and would be truncated by the immediate process.exit below,
    // hiding the reason a startup was refused (e.g. the HTTP auth fail-closed check).
    console.error(`failed to start server: ${message}`);
    logger.error(`failed to start server: ${error}`);
    process.exit(1);
});

// Handle server shutdown
process.on('SIGINT', async () => {
    logger.info('shutting down server...');
    process.exit(0);
});
