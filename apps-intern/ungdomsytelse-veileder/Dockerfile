FROM node:25-alpine AS base

ENV APP="ungdomsytelse-veileder"
ENV SERVER="server-ungdomsytelse-veileder"
ENV SCOPE=@navikt/ungdomsytelse-veileder

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
RUN turbo prune --scope=${SCOPE} --scope=@navikt/server-ungdomsytelse-veileder --docker

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

# Copy full pruned source code
COPY --from=prune /app/out/full/ ./

# Overskriv envSchema.ts i server med env.schema.ts fra app
COPY apps-intern/${APP}/env.schema.ts ${SERVER}/src/env.schema.ts

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
RUN mv /app/apps-intern/${APP}/dist /public


#########################################
# SERVER RUNTIME
#########################################
# Starter fra fresh node-image for å unngå å ta med npm/yarn/turbo fra base
FROM node:25-alpine AS server
WORKDIR /app
ENV SERVER="server-ungdomsytelse-veileder"

# Installer kun tini - trenger ikke npm/yarn i produksjon
RUN apk add --no-cache tini && rm -rf /var/cache/apk/*

# Copy server build
COPY --from=server-build /app/${SERVER}/dist ./
ENTRYPOINT ["/sbin/tini", "--"]

#########################################
# START APP
#########################################
FROM server

COPY --from=client-build /public ./public

CMD ["node", "index.js"]


