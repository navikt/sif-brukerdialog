
FROM node:18-alpine AS base
RUN apk update && apk add git
RUN apk add --no-cache libc6-compat

RUN yarn global add turbo

WORKDIR /app

ENV SCOPE=@navikt/ekstra-omsorgsdager-andre-forelder-ikke-tilsyn

FROM base AS pruner
COPY . .
RUN yarn
RUN yarn turbo run build-app --filter=${SCOPE}

FROM pruner AS server
WORKDIR /apps/ekstra-omsorgsdager-andre-forelder-ikke-tilsyn
COPY --from=pruner /app/node_modules ./node_modules/
COPY --from=pruner /app/apps/ekstra-omsorgsdager-andre-forelder-ikke-tilsyn/server.cjs .
COPY --from=pruner /app/apps/ekstra-omsorgsdager-andre-forelder-ikke-tilsyn/src/build/AppSettings.cjs ./src/build/AppSettings.cjs
COPY --from=pruner /app/apps/ekstra-omsorgsdager-andre-forelder-ikke-tilsyn/package.json .
COPY --from=pruner /app/apps/ekstra-omsorgsdager-andre-forelder-ikke-tilsyn/dist ./dist

EXPOSE 8080
CMD ["yarn","--cwd", "apps/ekstra-omsorgsdager-andre-forelder-ikke-tilsyn", "start-express"]
