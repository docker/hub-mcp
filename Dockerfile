FROM docker/dhi-node:23-alpine3.21-dev AS builder
WORKDIR /app
RUN echo "$(whoami)"
COPY src/ ./src/
COPY package.json .
COPY package-lock.json .
COPY tsconfig.json .
COPY openapi.json .

RUN npm install
RUN npm run build

FROM docker/dhi-node:23-alpine3.21
COPY --from=builder /app/node_modules /app/node_modules
COPY --from=builder /app/dist /app/dist
COPY --from=builder /app/openapi.json /app/openapi.json

WORKDIR /app

CMD ["node", "dist/index.js"]