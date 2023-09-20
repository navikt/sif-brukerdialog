
FROM node:18-alpine AS base
RUN apk update && apk add git
RUN apk add --no-cache libc6-compat

RUN yarn global add turbo

WORKDIR /app

ENV SCOPE=@navikt/omsorgsdager-aleneomsorg-dialog

FROM base AS pruner
COPY . .
RUN yarn
RUN yarn turbo run build-app --filter=${SCOPE}

FROM pruner AS server
WORKDIR /apps/omsorgsdager-aleneomsorg-dialog
COPY --from=pruner /app/node_modules ./node_modules/
COPY --from=pruner /app/apps/omsorgsdager-aleneomsorg-dialog/envSettings.js .
COPY --from=pruner /app/apps/omsorgsdager-aleneomsorg-dialog/server.js .
COPY --from=pruner /app/apps/omsorgsdager-aleneomsorg-dialog/tokenx.js .
COPY --from=pruner /app/apps/omsorgsdager-aleneomsorg-dialog/package.json .
COPY --from=pruner /app/apps/omsorgsdager-aleneomsorg-dialog/src/build/scripts/decorator.js ./src/build/scripts/decorator.js
COPY --from=pruner /app/apps/omsorgsdager-aleneomsorg-dialog/dist ./dist

EXPOSE 8080
CMD ["yarn","--cwd", "apps/omsorgsdager-aleneomsorg-dialog", "start-express"]
