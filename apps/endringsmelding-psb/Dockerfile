
FROM node:16.15.1-alpine AS base
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
WORKDIR /apps/endringsmelding-psb
COPY --from=pruner /app/node_modules ./node_modules/
COPY --from=pruner /app/apps/endringsmelding-psb/node_modules ./node_modules/
COPY --from=pruner /app/apps/endringsmelding-psb/envSettings.js .
COPY --from=pruner /app/apps/endringsmelding-psb/server.js .
COPY --from=pruner /app/apps/endringsmelding-psb/package.json .
COPY --from=pruner /app/apps/endringsmelding-psb/src/build/scripts/decorator.js ./src/build/scripts/decorator.js
COPY --from=pruner /app/apps/endringsmelding-psb/dist ./dist

EXPOSE 8080
CMD ["yarn","--cwd", "apps/endringsmelding-psb", "start-express"]
