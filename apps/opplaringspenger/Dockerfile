
FROM node:16.15.1-alpine AS base
RUN apk update && apk add git
RUN yarn global add turbo

WORKDIR /app

ENV SCOPE=@navikt/opplaringspenger

FROM base AS pruner
COPY . .
RUN yarn
RUN yarn turbo run build-app --filter=${SCOPE}

FROM pruner AS server
WORKDIR /apps/opplaringspenger
COPY --from=pruner /app/node_modules ./node_modules/
COPY --from=pruner /app/apps/opplaringspenger/node_modules ./node_modules/
COPY --from=pruner /app/apps/opplaringspenger/envSettings.js .
COPY --from=pruner /app/apps/opplaringspenger/server.js .
COPY --from=pruner /app/apps/opplaringspenger/package.json .
COPY --from=pruner /app/apps/opplaringspenger/src/build/scripts/decorator.js ./src/build/scripts/decorator.js
COPY --from=pruner /app/apps/opplaringspenger/dist ./dist

EXPOSE 8080
CMD ["yarn","--cwd", "apps/opplaringspenger", "start-express"]
