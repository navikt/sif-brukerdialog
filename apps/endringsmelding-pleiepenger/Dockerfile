
FROM node:18-alpine AS base
RUN apk update && apk add git
RUN apk add --no-cache libc6-compat

RUN yarn global add turbo

WORKDIR /app

ENV SCOPE=@navikt/endringsmelding-pleiepenger

FROM base AS pruner
COPY . .
RUN yarn
RUN yarn turbo run build-app --filter=${SCOPE}

FROM pruner AS server
WORKDIR /apps/endringsmelding-pleiepenger
COPY --from=pruner /app/node_modules ./node_modules/
COPY --from=pruner /app/apps/endringsmelding-pleiepenger/envSettings.js .
COPY --from=pruner /app/apps/endringsmelding-pleiepenger/server.js .
COPY --from=pruner /app/apps/endringsmelding-pleiepenger/tokenx.js .
COPY --from=pruner /app/apps/endringsmelding-pleiepenger/package.json .
COPY --from=pruner /app/apps/endringsmelding-pleiepenger/src/build/scripts/decorator.js ./src/build/scripts/decorator.js
COPY --from=pruner /app/apps/endringsmelding-pleiepenger/dist ./dist

EXPOSE 8080
CMD ["yarn","--cwd", "apps/endringsmelding-pleiepenger", "start-express"]
