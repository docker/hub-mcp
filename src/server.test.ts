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

import assert from 'node:assert/strict';
import http from 'node:http';
import { AddressInfo } from 'node:net';
import { test } from 'node:test';
import { HttpTransportOptions, HubMCPServer } from './server';

// Regression tests for RG-4626: the HTTP transport must not serve tools (which run
// under the operator's Docker Hub PAT) without authentication, and must reject
// browser-driven / DNS-rebinding requests.

const INIT_BODY = JSON.stringify({
    jsonrpc: '2.0',
    id: 1,
    method: 'initialize',
    params: {
        protocolVersion: '2025-06-18',
        capabilities: {},
        clientInfo: { name: 'test', version: '1.0' },
    },
});

interface Response {
    status: number;
    body: string;
}

// Uses the low-level http client (not fetch) so we can set otherwise-forbidden
// request headers such as Host, which the DNS-rebinding guard inspects.
function post(port: number, headers: Record<string, string>): Promise<Response> {
    return new Promise((resolve, reject) => {
        const req = http.request(
            {
                hostname: '127.0.0.1',
                port,
                path: '/mcp',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json, text/event-stream',
                    'Content-Length': Buffer.byteLength(INIT_BODY),
                    ...headers,
                },
            },
            (res) => {
                let body = '';
                res.on('data', (chunk) => (body += chunk));
                res.on('end', () => resolve({ status: res.statusCode ?? 0, body }));
            }
        );
        req.on('error', reject);
        req.write(INIT_BODY);
        req.end();
    });
}

const BASE_OPTIONS: HttpTransportOptions = {
    host: '127.0.0.1',
    allowUnauthenticated: false,
    allowedHosts: [],
    allowedOrigins: [],
};

const TOKEN = 'super-secret-token';
const AUTH_OPTIONS: HttpTransportOptions = { ...BASE_OPTIONS, authToken: TOKEN };
const bearer = { Authorization: `Bearer ${TOKEN}` };

// A username/token is supplied so PAT auth is configured; the security guards reject
// unauthorized requests before any Docker Hub call could be attempted.
function newServer(): HubMCPServer {
    return new HubMCPServer('test-user', 'test-pat');
}

// Binds the transport to an ephemeral loopback port and always closes it afterwards
// so the test process exits cleanly.
async function withServer(
    options: HttpTransportOptions,
    fn: (port: number) => Promise<void>
): Promise<void> {
    const app = newServer().buildHttpApp(options);
    const server = app.listen(0, '127.0.0.1');
    await new Promise<void>((resolve) => server.once('listening', () => resolve()));
    try {
        await fn((server.address() as AddressInfo).port);
    } finally {
        await new Promise<void>((resolve) => server.close(() => resolve()));
    }
}

test('buildHttpApp fails closed without a token or explicit opt-out', () => {
    assert.throws(() => newServer().buildHttpApp(BASE_OPTIONS), /Refusing to start/);
});

test('rejects a request with no bearer token (401)', async () => {
    await withServer(AUTH_OPTIONS, async (port) => {
        assert.equal((await post(port, {})).status, 401);
    });
});

test('rejects a request with a wrong bearer token (401)', async () => {
    await withServer(AUTH_OPTIONS, async (port) => {
        assert.equal((await post(port, { Authorization: 'Bearer wrong' })).status, 401);
    });
});

test('rejects a disallowed browser Origin (403)', async () => {
    await withServer(AUTH_OPTIONS, async (port) => {
        const res = await post(port, { ...bearer, Origin: 'http://evil.example' });
        assert.equal(res.status, 403);
    });
});

test('rejects a spoofed Host header / DNS rebinding (403)', async () => {
    await withServer(AUTH_OPTIONS, async (port) => {
        const res = await post(port, { ...bearer, Host: 'evil.example' });
        assert.equal(res.status, 403);
    });
});

test('accepts an authenticated loopback request (200)', async () => {
    await withServer(AUTH_OPTIONS, async (port) => {
        assert.equal((await post(port, bearer)).status, 200);
    });
});

test('--allow-unauthenticated serves without a token (200)', async () => {
    await withServer({ ...BASE_OPTIONS, allowUnauthenticated: true }, async (port) => {
        assert.equal((await post(port, {})).status, 200);
    });
});

test('honours an explicitly allowed Origin', async () => {
    const options = { ...AUTH_OPTIONS, allowedOrigins: ['http://app.example'] };
    await withServer(options, async (port) => {
        const allowed = await post(port, { ...bearer, Origin: 'http://app.example' });
        assert.equal(allowed.status, 200);
    });
});
