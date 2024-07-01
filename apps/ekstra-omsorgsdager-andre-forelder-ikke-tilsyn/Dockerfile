
FROM node:18-alpine AS base
RUN apk update && apk add git
RUN apk add --no-cache libc6-compat

RUN yarn global add turbo

WORKDIR /app

ENV SCOPE=@navikt/ekstra-omsorgsdager-andre-forelder-ikke-tilsyn

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
WORKDIR /apps/ekstra-omsorgsdager-andre-forelder-ikke-tilsyn
COPY --from=ws-installer /app-ws/node_modules ./node_modules/
COPY --from=turbo-builder /app/apps/ekstra-omsorgsdager-andre-forelder-ikke-tilsyn/server.cjs .
COPY --from=turbo-builder /app/apps/ekstra-omsorgsdager-andre-forelder-ikke-tilsyn/tokenx.cjs .
COPY --from=turbo-builder /app/apps/ekstra-omsorgsdager-andre-forelder-ikke-tilsyn/package.json .
COPY --from=turbo-builder /app/apps/ekstra-omsorgsdager-andre-forelder-ikke-tilsyn/src/build/decorator.cjs ./src/build/decorator.cjs
COPY --from=turbo-builder /app/apps/ekstra-omsorgsdager-andre-forelder-ikke-tilsyn/src/build/AppSettings.cjs ./src/build/AppSettings.cjs
COPY --from=turbo-builder /app/apps/ekstra-omsorgsdager-andre-forelder-ikke-tilsyn/dist ./dist

EXPOSE 8080
CMD ["server.cjs"]
