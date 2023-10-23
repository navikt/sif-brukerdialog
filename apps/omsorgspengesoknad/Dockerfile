
FROM node:18-alpine AS base
RUN apk update && apk add git
RUN apk add --no-cache libc6-compat

RUN yarn global add turbo

WORKDIR /app

ENV SCOPE=@navikt/omsorgspengesoknad

FROM base AS pruner
COPY . .
RUN yarn
RUN yarn turbo run build-app --filter=${SCOPE}

FROM pruner AS server
WORKDIR /apps/omsorgspengesoknad
COPY --from=pruner /app/node_modules ./node_modules/
COPY --from=pruner /app/apps/omsorgspengesoknad/server.cjs .
COPY --from=pruner /app/apps/omsorgspengesoknad/tokenx.cjs .
COPY --from=pruner /app/apps/omsorgspengesoknad/package.json .
COPY --from=pruner /app/apps/omsorgspengesoknad/src/build/scripts/decorator.cjs ./src/build/scripts/decorator.cjs
COPY --from=pruner /app/apps/omsorgspengesoknad/dist ./dist

EXPOSE 8080
CMD ["yarn","--cwd", "apps/omsorgspengesoknad", "start-express"]
