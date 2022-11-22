
FROM node:16.15.1-alpine AS base
RUN apk update && apk add git
RUN yarn global add turbo@1.5.5

WORKDIR /app

ENV SCOPE=@navikt/omsorgspenger

FROM base AS pruner
COPY . .
RUN yarn
RUN yarn turbo run build-app --filter=${SCOPE}

FROM pruner AS server
WORKDIR /apps/omsorgspenger
COPY --from=pruner /app/node_modules ./node_modules/
COPY --from=pruner /app/apps/omsorgspenger/node_modules ./node_modules/
COPY --from=pruner /app/apps/omsorgspenger/envSettings.js .
COPY --from=pruner /app/apps/omsorgspenger/server.js .
COPY --from=pruner /app/apps/omsorgspenger/package.json .
COPY --from=pruner /app/apps/omsorgspenger/src/build/scripts/decorator.js ./src/build/scripts/decorator.js
COPY --from=pruner /app/apps/omsorgspenger/dist ./dist

EXPOSE 8080
CMD ["yarn","--cwd", "apps/omsorgspenger", "start-express"]
