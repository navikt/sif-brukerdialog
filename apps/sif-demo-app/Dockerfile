FROM node:25-alpine AS base

ENV APP="sif-demo-app"
ENV SERVER="server"
ENV SCOPE=@navikt/sif-demo-app

RUN apk fix \
    && apk add --no-cache --update libc6-compat tini \
    && rm -rf /var/cache/apk/*

RUN yarn global add turbo

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
COPY apps/${APP}/env.schema.ts ${SERVER}/src/env.schema.ts

#########################################
# BUILD SERVER
#########################################

FROM installer AS server-build
WORKDIR /app/${SERVER}
RUN --mount=type=secret,id=PACKAGES_AUTH_TOKEN \
    PACKAGES_AUTH_TOKEN=$(cat /run/secrets/PACKAGES_AUTH_TOKEN) yarn build


#########################################
# Client
#########################################

FROM installer AS client-build
WORKDIR /app
RUN --mount=type=secret,id=PACKAGES_AUTH_TOKEN \
    PACKAGES_AUTH_TOKEN=$(cat /run/secrets/PACKAGES_AUTH_TOKEN) yarn turbo run build --filter=${SCOPE}
RUN mv /app/apps/${APP}/dist /public


#########################################
# Server
#########################################
# Starter fra fresh node-image for å unngå å ta med npm/yarn/turbo fra base
FROM node:25-alpine AS server
WORKDIR /app

# Installer kun tini - trenger ikke npm/yarn i produksjon
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


