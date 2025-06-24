FROM node:current-alpine3.22 AS builder
WORKDIR /app

COPY src/ ./src/
COPY package.json .
COPY package-lock.json .
COPY tsconfig.json .

RUN npm ci
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