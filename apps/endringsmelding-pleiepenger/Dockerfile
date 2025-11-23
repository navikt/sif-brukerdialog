FROM node:25-alpine AS base

ENV APP="endringsmelding-pleiepenger"
ENV SERVER="server"
ENV SCOPE=@navikt/endringsmelding-pleiepenger

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
RUN turbo prune --scope=${SCOPE} --docker

# Server is not in the app's dependency tree, but needed at runtime
# Copy it separately to a dedicated output location
ARG SERVER
RUN mkdir -p /app/out/server && cp -r ${SERVER} /app/out/server/

#########################################
# BUILDER IMAGE - INSTALL PACKAGES AND COPY SOURCE
#########################################

FROM base AS installer
WORKDIR /app

# Copy yarn configuration from original workspace (not included in turbo prune output)
COPY .yarnrc.yml ./
COPY .yarn/releases/ ./.yarn/releases/

# Copy pruned lockfile and package.json files
COPY --from=prune /app/out/json/ ./
COPY --from=prune /app/out/yarn.lock ./yarn.lock

# Copy server package.json (not included in turbo prune json output)
ARG SERVER
COPY --from=prune /app/out/server/${SERVER}/package.json ./${SERVER}/package.json

# Install dependencies with pruned lockfile
RUN --mount=type=secret,id=PACKAGES_AUTH_TOKEN \
    PACKAGES_AUTH_TOKEN=$(cat /run/secrets/PACKAGES_AUTH_TOKEN) yarn install --immutable

# Copy full pruned source
COPY --from=prune /app/out/full/ ./

# Copy server (not included in turbo prune because it's not a dependency)
ARG SERVER
COPY --from=prune /app/out/server/${SERVER} ./${SERVER}

# Overskriv envSchema.ts i server med env.schema.ts fra app
ARG APP
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
WORKDIR /app
RUN --mount=type=secret,id=PACKAGES_AUTH_TOKEN \
    PACKAGES_AUTH_TOKEN=$(cat /run/secrets/PACKAGES_AUTH_TOKEN) yarn turbo run build --filter=${SCOPE}
RUN mv /app/apps/${APP}/dist /public


#########################################
# Server
#########################################
FROM base AS server
ARG SERVER
WORKDIR /app
COPY --from=server-build /app/${SERVER}/dist ./
ENTRYPOINT ["/sbin/tini", "--"]

#########################################
# App
#########################################
FROM server

COPY --from=client-build /public ./public

CMD ["node", "index.js"]


