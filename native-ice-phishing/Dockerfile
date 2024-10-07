# Build stage: compile Typescript to Javascript
FROM node:20-alpine AS builder

# Define build-time arguments
ARG CHAIN_ID
ARG EVM_RPC
ARG STORAGE_API_URL
ARG NODE_ENV

# Set environment variables in the container
ENV CHAIN_ID=$CHAIN_ID
ENV EVM_RPC=$EVM_RPC
ENV STORAGE_API_URL=$STORAGE_API_URL
ENV NODE_ENV=$NODE_ENV

WORKDIR /app
COPY . .
RUN npm ci
RUN npm run build

# Final stage: copy compiled Javascript from previous stage and install production dependencies
FROM node:20-alpine

# Define build-time arguments
ARG CHAIN_ID
ARG EVM_RPC
ARG STORAGE_API_URL
ARG NODE_ENV

# Set environment variables in the container
ENV CHAIN_ID=$CHAIN_ID
ENV EVM_RPC=$EVM_RPC
ENV STORAGE_API_URL=$STORAGE_API_URL
ENV NODE_ENV=$NODE_ENV

# Uncomment the following line to enable agent logging
LABEL "network.forta.settings.agent-logs.enable"="true"
WORKDIR /app
COPY --from=builder /app/dist ./src
COPY package*.json ./
COPY ./LICENSE ./
# TODO: Comment out for production so the scan node's keys are used
#COPY forta.config.json ./forta.config.json
RUN npm ci --production
CMD [ "npm", "run", "start:prod" ]