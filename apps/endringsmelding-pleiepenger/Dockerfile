FROM node:25-alpine AS base

ENV APP="endringsmelding-pleiepenger"
ENV SERVER="server"
ENV SCOPE=@navikt/endringsmelding-pleiepenger

RUN apk fix \
    && apk add --no-cache --update libc6-compat tini \
    && rm -rf /var/cache/apk/*

# Upgrade npm to get patched glob/tar versions (node:25-alpine ships with npm 11.6.2 which has vulnerable deps)
RUN npm install -g npm@11.6.3

# Install turbo globally
RUN npm install -g turbo@2.6.1

#########################################
# PRUNE - Use turbo to create pruned workspace
#########################################

FROM base AS prune
WORKDIR /app
COPY . .
# Include both app and server in prune (server is needed at runtime but not in dependency tree)
RUN turbo prune --scope=${SCOPE} --scope=@navikt/sif-server --docker

#########################################
# BUILDER IMAGE - INSTALL PACKAGES AND COPY SOURCE
#########################################

FROM base AS installer
WORKDIR /app

# Copy yarn configuration from original workspace (not included in turbo prune output)
COPY .yarnrc.yml ./
COPY .yarn/releases/ ./.yarn/releases/

# Copy pruned lockfile and package.json files (includes server now)
COPY --from=prune /app/out/json/ ./
COPY --from=prune /app/out/yarn.lock ./yarn.lock

# Install dependencies with pruned lockfile
# Note: Installing all deps (including dev) because we need them for build
RUN --mount=type=secret,id=PACKAGES_AUTH_TOKEN \
    PACKAGES_AUTH_TOKEN=$(cat /run/secrets/PACKAGES_AUTH_TOKEN) yarn install --immutable

# Copy full pruned source (includes server because of --scope=@navikt/sif-server)
COPY --from=prune /app/out/full/ ./

# Overskriv envSchema.ts i server med env.schema.ts fra app
ARG APP
ARG SERVER
COPY apps/${APP}/env.schema.ts ${SERVER}/src/env.schema.ts

#########################################
# BUILD SERVER
#########################################

FROM installer AS server-build
ARG SERVER
WORKDIR /app/${SERVER}
RUN --mount=type=secret,id=PACKAGES_AUTH_TOKEN \
    PACKAGES_AUTH_TOKEN=$(cat /run/secrets/PACKAGES_AUTH_TOKEN) yarn build


#########################################
# Client
#########################################

FROM installer AS client-build
ARG SCOPE
ARG APP
WORKDIR /app
RUN --mount=type=secret,id=PACKAGES_AUTH_TOKEN \
    PACKAGES_AUTH_TOKEN=$(cat /run/secrets/PACKAGES_AUTH_TOKEN) yarn turbo run build --filter=${SCOPE}
RUN mv /app/apps/${APP}/dist /public


#########################################
# Server
#########################################
FROM node:25-alpine AS server
WORKDIR /app

# Install only tini, don't need npm/yarn in production
RUN apk add --no-cache tini && rm -rf /var/cache/apk/*

# Copy server build (server/ is hardcoded since it's the same for all apps)
COPY --from=server-build /app/server/dist ./
ENTRYPOINT ["/sbin/tini", "--"]

#########################################
# App
#########################################
FROM server

COPY --from=client-build /public ./public

CMD ["node", "index.js"]


