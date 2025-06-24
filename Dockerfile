FROM node:current-alpine3.22 AS builder
WORKDIR /app
COPY src/ ./src/
COPY package.json .
COPY package-lock.json .
COPY tsconfig.json .

RUN npm install
RUN npm run build

CMD ["node", "dist/index.js"]