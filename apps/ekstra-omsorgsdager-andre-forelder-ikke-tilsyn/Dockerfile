FROM node:25-alpine AS base

ENV APP="ekstra-omsorgsdager-andre-forelder-ikke-tilsyn"
ENV SERVER="server"
ENV SCOPE=@navikt/ekstra-omsorgsdager-andre-forelder-ikke-tilsyn

RUN apk fix \
    && apk add --no-cache --update libc6-compat tini \
    && rm -rf /var/cache/apk/*

RUN yarn global add turbo

#########################################
# PRUNE - Turbo prune for å lage prunet workspace
#########################################

FROM base AS prune
WORKDIR /app
COPY . .
# Inkluder både app og server (server trengs runtime, men er ikke i dependency tree)
RUN turbo prune --scope=${SCOPE} --scope=@navikt/sif-server --docker

#########################################
# INSTALLER - Installer dependencies og kopier kildekode
#########################################

FROM base AS installer
WORKDIR /app

# Kopier yarn-konfigurasjon (ikke inkludert i turbo prune output)
COPY .yarnrc.yml ./
COPY .yarn/releases/ ./.yarn/releases/

# Kopier prunet lockfile og package.json filer
COPY --from=prune /app/out/json/ ./
COPY --from=prune /app/out/yarn.lock ./yarn.lock

# Installer dependencies med prunet lockfile
RUN --mount=type=secret,id=PACKAGES_AUTH_TOKEN \
    PACKAGES_AUTH_TOKEN=$(cat /run/secrets/PACKAGES_AUTH_TOKEN) yarn install --immutable

# Kopier full prunet kildekode
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
# Starter fra fresh node-image for å unngå å ta med npm/yarn/turbo fra base
FROM node:25-alpine AS server
WORKDIR /app

# Installer kun tini - trenger ikke npm/yarn i produksjon
RUN apk add --no-cache tini && rm -rf /var/cache/apk/*

# Kopier bygd server
COPY --from=server-build /app/server/dist ./
ENTRYPOINT ["/sbin/tini", "--"]

#########################################
# App
#########################################
FROM server

COPY --from=client-build /public ./public

CMD ["node", "index.js"]


