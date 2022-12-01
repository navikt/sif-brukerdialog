
FROM node:16.15.1-alpine AS base
RUN apk update && apk add git
RUN yarn global add turbo

WORKDIR /app

ENV SCOPE=@navikt/{SIF_SOKNAD_TEMPLATE}

FROM base AS pruner
COPY . .
RUN yarn
RUN yarn turbo run build-app --filter=${SCOPE}

FROM pruner AS server
WORKDIR /apps/{SIF_SOKNAD_TEMPLATE}
COPY --from=pruner /app/node_modules ./node_modules/
COPY --from=pruner /app/apps/{SIF_SOKNAD_TEMPLATE}/node_modules ./node_modules/
COPY --from=pruner /app/apps/{SIF_SOKNAD_TEMPLATE}/envSettings.js .
COPY --from=pruner /app/apps/{SIF_SOKNAD_TEMPLATE}/server.js .
COPY --from=pruner /app/apps/{SIF_SOKNAD_TEMPLATE}/package.json .
COPY --from=pruner /app/apps/{SIF_SOKNAD_TEMPLATE}/src/build/scripts/decorator.js ./src/build/scripts/decorator.js
COPY --from=pruner /app/apps/{SIF_SOKNAD_TEMPLATE}/dist ./dist

EXPOSE 8080
CMD ["yarn","--cwd", "apps/{SIF_SOKNAD_TEMPLATE}", "start-express"]
