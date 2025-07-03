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
const logsDir = parseLogsDir(process.argv.slice(2));

function parseLogsDir(args: string[]): string | undefined {
    const logsDirArg = args.find((arg) => arg.startsWith('--logs-dir='))?.split('=')[1];
    if (!logsDirArg) {
        if (process.env.NODE_ENV === 'production') {
            return '/app/logs';
        }
        console.warn('logs dir unspecified');
        return undefined;
    }

    return logsDirArg;
}

export const logger = winston.createLogger({
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
    transports: logsDir
        ? [
              //
              // - Write all logs with importance level of `error` or higher to `error.log`
              //   (i.e., error, fatal, but not other levels)
              //
              new winston.transports.File({
                  filename: path.join(logsDir, 'error.log'),
                  level: 'warn',
              }),
              //
              // - Write all logs with importance level of `info` or higher to `combined.log`
              //   (i.e., fatal, error, warn, and info, but not trace)
              //
              new winston.transports.File({
                  filename: path.join(logsDir, 'mcp.log'),
                  level: 'info',
              }),
          ]
        : [],
});

//
// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `

if (process.env.NODE_ENV !== 'production') {
    logger.add(
        new winston.transports.Console({
            format: winston.format.simple(),
            log: (info) => {
                console.error(info.message);
            },
        })
    );
}
