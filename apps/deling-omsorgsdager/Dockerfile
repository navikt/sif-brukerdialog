
FROM node:16.15.1-alpine AS base
RUN apk update && apk add git
RUN yarn global add turbo

WORKDIR /app

ENV SCOPE=@navikt/deling-omsorgsdager

FROM base AS pruner
COPY . .
RUN yarn install
RUN yarn turbo run build --filter=${SCOPE}

FROM pruner AS server
WORKDIR /apps/deling-omsorgsdager
COPY --from=pruner /app/node_modules ./node_modules/
COPY --from=pruner /app/apps/deling-omsorgsdager/node_modules ./node_modules/
COPY --from=pruner /app/apps/deling-omsorgsdager/envSettings.js .
COPY --from=pruner /app/apps/deling-omsorgsdager/server.js .
# COPY --from=pruner /app/apps/deling-omsorgsdager/tokenx.js .
COPY --from=pruner /app/apps/deling-omsorgsdager/package.json .
COPY --from=pruner /app/apps/deling-omsorgsdager/src/build/scripts/decorator.js ./src/build/scripts/decorator.js
COPY --from=pruner /app/apps/deling-omsorgsdager/dist ./dist

EXPOSE 8080
CMD ["yarn","--cwd", "apps/deling-omsorgsdager", "start-express"]
