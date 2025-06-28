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

import path from 'path';
import winston, { format } from 'winston';
export let logger: winston.Logger;

export function initLogger(logsDir?: string) {
    logger = winston.createLogger({
        level: 'info',
        format: format.combine(
            format.timestamp({
                format: 'YYYY-MM-DD HH:mm:ss',
            }),
            format.errors({ stack: true }),
            format.splat(),
            format.json()
        ),
        defaultMeta: { service: 'dockerhub-mcp-server' },
        transports: [],
    });

    if (process.env.NODE_ENV === 'production' && !logsDir) {
        logsDir = '/app/logs';
        console.warn(`logs dir unspecified, defaulting to ${logsDir}`);
    }

    if (logsDir) {
        logger.transports.push(
            new winston.transports.File({
                filename: path.join(logsDir, 'error.log'),
                level: 'warn',
            }),
            new winston.transports.File({ filename: path.join(logsDir, 'mcp.log'), level: 'info' })
        );
    } else {
        logger.add(
            new winston.transports.Console({
                format: winston.format.simple(),
                log: (info) => {
                    console.error(info.message);
                },
            })
        );
    }
}
