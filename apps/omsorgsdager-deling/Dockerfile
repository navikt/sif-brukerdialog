
FROM node:16.15.1-alpine AS base
RUN apk update && apk add git
RUN yarn global add turbo

WORKDIR /app

ENV SCOPE=@navikt/omsorgsdager-deling

FROM base AS pruner
COPY . .
RUN yarn install
RUN yarn turbo run build --filter=${SCOPE}

FROM pruner AS server
WORKDIR /apps/omsorgsdager-deling
COPY --from=pruner /app/node_modules ./node_modules/
COPY --from=pruner /app/apps/omsorgsdager-deling/node_modules ./node_modules/
COPY --from=pruner /app/apps/omsorgsdager-deling/envSettings.js .
COPY --from=pruner /app/apps/omsorgsdager-deling/server.js .
# COPY --from=pruner /app/apps/omsorgsdager-deling/tokenx.js .
COPY --from=pruner /app/apps/omsorgsdager-deling/package.json .
COPY --from=pruner /app/apps/omsorgsdager-deling/src/build/scripts/decorator.js ./src/build/scripts/decorator.js
COPY --from=pruner /app/apps/omsorgsdager-deling/dist ./dist

EXPOSE 8080
CMD ["yarn","--cwd", "apps/omsorgsdager-deling", "start-express"]
