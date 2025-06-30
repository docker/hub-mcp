#   Copyright 2025 Docker Hub MCP Server authors
#
#   Licensed under the Apache License, Version 2.0 (the "License");
#   you may not use this file except in compliance with the License.
#   You may obtain a copy of the License at
#
#       http://www.apache.org/licenses/LICENSE-2.0
#
#   Unless required by applicable law or agreed to in writing, software
#   distributed under the License is distributed on an "AS IS" BASIS,
#   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
#   See the License for the specific language governing permissions and
#   limitations under the License.


FROM node:current-alpine3.22 AS builder
WORKDIR /app

COPY package.json .
COPY package-lock.json .
COPY tsconfig.json .

RUN npm ci

COPY src/ ./src/

RUN npm run build

FROM node:current-alpine3.22
# Create app directory
WORKDIR /app

# Create a non-root user
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

# Copy built files from builder stage
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist/ ./dist/

# Install production dependencies only
RUN npm ci --omit=dev && npm cache clean --force

# Set proper permissions
RUN chown -R appuser:appgroup /app

# Switch to non-root user
USER appuser

# Set environment variables
ENV NODE_ENV=production

# Command to run the application
ENTRYPOINT ["node", "dist/index.js"]