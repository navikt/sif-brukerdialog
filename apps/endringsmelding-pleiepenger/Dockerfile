FROM node:22-alpine AS base

ENV APP="endringsmelding-pleiepenger"
ENV SERVER="server"
ENV SCOPE=@navikt/endringsmelding-pleiepenger

RUN apk fix \
    && apk add --no-cache --update libc6-compat tini \
    && rm -rf /var/cache/apk/*

RUN yarn global add turbo

#########################################
# PREPARE DEPS FOR BUILD
#########################################

FROM base AS prepare
WORKDIR /app
COPY ["package.json", ".yarnrc.yml", "yarn.lock", "turbo.json", "./"]
COPY [".yarn/releases/*", ".yarn/releases/"]
COPY packages packages
COPY apps apps
ARG SERVER
COPY ${SERVER} ${SERVER}
RUN find apps \! -name "package.json" -mindepth 2 -maxdepth 2 -print | xargs rm -rf
RUN find packages \! -name "package.json" -mindepth 2 -maxdepth 2 -print | xargs rm -rf
RUN find ${SERVER} \! -name "package.json" -mindepth 2 -maxdepth 2 -print | xargs rm -rf

#########################################
# BUILDER IMAGE - INSTALL PACKAGES AND COPY SOURCE
#########################################

FROM prepare AS installer
COPY --from=prepare /app ./
RUN --mount=type=secret,id=PACKAGES_AUTH_TOKEN \
    PACKAGES_AUTH_TOKEN=$(cat /run/secrets/PACKAGES_AUTH_TOKEN) yarn
COPY . .
# Overskriv envSchema.ts i server med env.schema.ts fra app
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


