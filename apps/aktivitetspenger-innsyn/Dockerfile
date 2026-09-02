FROM node:26-alpine AS base

ENV APP="aktivitetspenger-innsyn"
ENV SERVER="server"
ENV SCOPE=@navikt/aktivitetspenger-innsyn

RUN apk fix \
    && apk add --no-cache --update libc6-compat \
    && rm -rf /var/cache/apk/*

RUN npm install -g turbo
RUN npm install -g pnpm@10.33.4

#########################################
# PRUNE
#########################################

FROM base AS prune
WORKDIR /app
COPY . .
# Prune med app og server
RUN turbo prune --scope=${SCOPE} --scope=@navikt/sif-server --docker

#########################################
# INSTALLER - Installer pakker og kopier kildekode
#########################################

FROM base AS installer
WORKDIR /app

# Kopier npm-konfigurasjon fra workspace (ikke inkludert i turbo prune output)
COPY .npmrc ./

# Kopier pruned lockfile og package.json filer
COPY --from=prune /app/out/json/ ./
COPY --from=prune /app/out/pnpm-lock.yaml ./pnpm-lock.yaml

# Installer avhengigheter med pruned lockfile (inkl. dev)
RUN --mount=type=secret,id=NPM_TOKEN \
    NPM_TOKEN=$(cat /run/secrets/NPM_TOKEN) pnpm install --frozen-lockfile

# Kopier pruned kildekode
COPY --from=prune /app/out/full/ ./

# Overskriv env.schema.ts i server med den fra app
COPY apps/${APP}/env.schema.ts ${SERVER}/src/env.schema.ts

#########################################
# BYGG SERVER
#########################################

FROM installer AS server-build
WORKDIR /app/${SERVER}
RUN --mount=type=secret,id=NPM_TOKEN \
    NPM_TOKEN=$(cat /run/secrets/NPM_TOKEN) pnpm build


#########################################
# BYGG KLIENT
#########################################

FROM installer AS client-build
ARG VITE_BUILD_MODE=production
WORKDIR /app
RUN --mount=type=secret,id=NPM_TOKEN \
    NPM_TOKEN=$(cat /run/secrets/NPM_TOKEN) \
    pnpm turbo run build --filter=${SCOPE} \
    -- --mode ${VITE_BUILD_MODE}
RUN mv /app/apps/${APP}/dist /public


#########################################
# SERVER RUNTIME
#########################################
# Chainguard-image kjører nonroot (uid 65532) by default, ingen apk/shell/npm i slim
FROM europe-north1-docker.pkg.dev/cgr-nav/pull-through/nav.no/node:26-slim AS server
WORKDIR /app
ENV SERVER="server"

# Kopier bygget server
COPY --from=server-build --chown=65532:65532 /app/${SERVER}/dist ./

#########################################
# START APP
#########################################
FROM server

COPY --from=client-build --chown=65532:65532 /public ./public

EXPOSE 8080

CMD ["index.js"]


