
FROM node:16.15.1-alpine AS base
RUN apk update && apk add git
RUN yarn global add turbo

WORKDIR /app

ENV SCOPE=@navikt/endingsmelding-psb

FROM base AS pruner
COPY . .
RUN yarn
RUN yarn turbo run build-app --filter=${SCOPE}

FROM pruner AS server
WORKDIR /apps/endingsmelding-psb
COPY --from=pruner /app/node_modules ./node_modules/
COPY --from=pruner /app/apps/endingsmelding-psb/node_modules ./node_modules/
COPY --from=pruner /app/apps/endingsmelding-psb/envSettings.js .
COPY --from=pruner /app/apps/endingsmelding-psb/server.js .
COPY --from=pruner /app/apps/endingsmelding-psb/package.json .
COPY --from=pruner /app/apps/endingsmelding-psb/src/build/scripts/decorator.js ./src/build/scripts/decorator.js
COPY --from=pruner /app/apps/endingsmelding-psb/dist ./dist

EXPOSE 8080
CMD ["yarn","--cwd", "apps/endingsmelding-psb", "start-express"]
