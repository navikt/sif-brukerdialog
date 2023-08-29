
FROM node:16-alpine AS base
RUN apk update && apk add git
RUN apk add --no-cache libc6-compat

RUN yarn global add turbo

WORKDIR /app

ENV SCOPE=@navikt/omsorgspengerutbetaling-arbeidstaker-soknad

FROM base AS pruner
COPY . .
RUN yarn
RUN yarn turbo run build-app --filter=${SCOPE}

FROM pruner AS server
WORKDIR /apps/omsorgspengerutbetaling-arbeidstaker-soknad
COPY --from=pruner /app/node_modules ./node_modules/
COPY --from=pruner /app/apps/omsorgspengerutbetaling-arbeidstaker-soknad/envSettings.js .
COPY --from=pruner /app/apps/omsorgspengerutbetaling-arbeidstaker-soknad/server.js .
COPY --from=pruner /app/apps/omsorgspengerutbetaling-arbeidstaker-soknad/tokenx.js .
COPY --from=pruner /app/apps/omsorgspengerutbetaling-arbeidstaker-soknad/package.json .
COPY --from=pruner /app/apps/omsorgspengerutbetaling-arbeidstaker-soknad/src/build/scripts/decorator.js ./src/build/scripts/decorator.js
COPY --from=pruner /app/apps/omsorgspengerutbetaling-arbeidstaker-soknad/dist ./dist

EXPOSE 8080
CMD ["yarn","--cwd", "apps/omsorgspengerutbetaling-arbeidstaker-soknad", "start-express"]
