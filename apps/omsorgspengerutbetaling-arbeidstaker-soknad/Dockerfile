FROM node:25.1.0-alpine AS base

ENV APP="omsorgspengerutbetaling-arbeidstaker-soknad"
ENV SERVER="server"
ENV SCOPE=@navikt/omsorgspengerutbetaling-arbeidstaker-soknad

RUN apk fix \
    && apk add --no-cache --update libc6-compat tini \
    && rm -rf /var/cache/apk/*

RUN yarn global add turbo

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

# Kopier yarn-konfigurasjon fra workspace (ikke inkludert i turbo prune output)
COPY .yarnrc.yml ./
COPY .yarn/releases/ ./.yarn/releases/

# Kopier pruned lockfile og package.json filer
COPY --from=prune /app/out/json/ ./
COPY --from=prune /app/out/yarn.lock ./yarn.lock


# Installer avhengigheter med pruned lockfile (inkl. dev)
RUN --mount=type=secret,id=PACKAGES_AUTH_TOKEN \
    PACKAGES_AUTH_TOKEN=$(cat /run/secrets/PACKAGES_AUTH_TOKEN) yarn install --immutable

# Kopier pruned kildekode
COPY --from=prune /app/out/full/ ./

# Overskriv envSchema.ts i server med env.schema.ts fra app
COPY apps/${APP}/env.schema.ts ${SERVER}/src/env.schema.ts

#########################################
# BYGG SERVER
#########################################

FROM installer AS server-build
WORKDIR /app/${SERVER}
RUN --mount=type=secret,id=PACKAGES_AUTH_TOKEN \
    PACKAGES_AUTH_TOKEN=$(cat /run/secrets/PACKAGES_AUTH_TOKEN) yarn build


#########################################
# BYGG KLIENT
#########################################

FROM installer AS client-build
WORKDIR /app
RUN --mount=type=secret,id=PACKAGES_AUTH_TOKEN \
    PACKAGES_AUTH_TOKEN=$(cat /run/secrets/PACKAGES_AUTH_TOKEN) yarn turbo run build --filter=${SCOPE}
RUN mv /app/apps/${APP}/dist /public


#########################################
# SERVER RUNTIME
#########################################
# Starter fra fresh node-image for å unngå å ta med npm/yarn/turbo fra base
FROM node:25-alpine AS server
WORKDIR /app
ENV SERVER="server"

# Installer kun tini - trenger ikke npm/yarn i produksjon
RUN apk add --no-cache tini && rm -rf /var/cache/apk/*

# Kopier bygget server
COPY --from=server-build /app/${SERVER}/dist ./
ENTRYPOINT ["/sbin/tini", "--"]

#########################################
# START APP
#########################################
FROM server

COPY --from=client-build /public ./public

CMD ["node", "index.cjs"]


