
FROM node:18-alpine AS base
RUN apk update && apk add git
RUN apk add --no-cache libc6-compat

RUN yarn global add turbo

WORKDIR /app

ENV SCOPE=@navikt/omsorgspengesoknad

FROM base AS turbo-builder
COPY . .
RUN yarn
RUN yarn turbo run build --filter=${SCOPE}

FROM base AS ws-installer
RUN apk update && apk add git
RUN apk add --no-cache libc6-compat
WORKDIR /app-ws
COPY . .
RUN yarn workspaces focus ${SCOPE} --production

FROM gcr.io/distroless/nodejs18-debian11:nonroot
WORKDIR /apps/omsorgspengesoknad
COPY --from=ws-installer /app-ws/node_modules ./node_modules/
COPY --from=turbo-builder /app/apps/omsorgspengesoknad/server.cjs .
COPY --from=turbo-builder /app/apps/omsorgspengesoknad/tokenx.cjs .
COPY --from=turbo-builder /app/apps/omsorgspengesoknad/package.json .
COPY --from=turbo-builder /app/apps/omsorgspengesoknad/src/build/decorator.cjs ./src/build/decorator.cjs
COPY --from=turbo-builder /app/apps/omsorgspengesoknad/src/build/AppSettings.cjs ./src/build/AppSettings.cjs
COPY --from=turbo-builder /app/apps/omsorgspengesoknad/dist ./dist

EXPOSE 8080
CMD ["server.cjs"]


