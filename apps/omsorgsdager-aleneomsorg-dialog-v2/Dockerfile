FROM europe-north1-docker.pkg.dev/cgr-nav/pull-through/nav.no/node:26-dev AS base

ENV APP="omsorgsdager-aleneomsorg-dialog-v2"
ENV SERVER="server"
ENV SCOPE=@navikt/omsorgsdager-aleneomsorg-dialog-v2

RUN npm install -g turbo@2.10.13
RUN npm install -g pnpm@10.33.4

FROM base AS prune
WORKDIR /app
COPY . .
RUN turbo prune ${SCOPE} @sif/server --docker

FROM base AS installer
WORKDIR /app
COPY .npmrc ./
COPY --from=prune /app/out/json/ ./
COPY --from=prune /app/out/pnpm-lock.yaml ./pnpm-lock.yaml

RUN --mount=type=secret,id=NPM_TOKEN \
    NPM_TOKEN=$(cat /run/secrets/NPM_TOKEN) pnpm install --frozen-lockfile

COPY --from=prune /app/out/full/ ./
COPY apps/${APP}/env.schema.ts ${SERVER}/src/env.schema.ts

FROM installer AS server-build
WORKDIR /app/${SERVER}
RUN --mount=type=secret,id=NPM_TOKEN \
    NPM_TOKEN=$(cat /run/secrets/NPM_TOKEN) pnpm build

FROM installer AS client-build
ARG VITE_BUILD_MODE=production
WORKDIR /app
RUN --mount=type=secret,id=NPM_TOKEN \
    NPM_TOKEN=$(cat /run/secrets/NPM_TOKEN) \
    pnpm turbo run build --filter=${SCOPE} \
    -- --mode ${VITE_BUILD_MODE}
RUN mkdir /public && mv /app/apps/${APP}/dist/index.html /public

FROM europe-north1-docker.pkg.dev/cgr-nav/pull-through/nav.no/node:26-slim AS server
WORKDIR /app
ENV SERVER="server"

COPY --from=server-build --chown=65532:65532 /app/${SERVER}/dist ./

FROM server
COPY --from=client-build --chown=65532:65532 /public ./public

EXPOSE 8080
CMD ["index.js"]
