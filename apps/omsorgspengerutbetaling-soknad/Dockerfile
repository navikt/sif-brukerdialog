
FROM node:18-alpine AS base
RUN apk update && apk add git
RUN apk add --no-cache libc6-compat

RUN yarn global add turbo

WORKDIR /app

ENV SCOPE=@navikt/omsorgspengerutbetaling-soknad

FROM base AS pruner
COPY . .
RUN yarn
RUN yarn turbo run build-app --filter=${SCOPE}

FROM pruner AS server
WORKDIR /apps/omsorgspengerutbetaling-soknad
COPY --from=pruner /app/node_modules ./node_modules/
COPY --from=pruner /app/apps/omsorgspengerutbetaling-soknad/envSettings.js .
COPY --from=pruner /app/apps/omsorgspengerutbetaling-soknad/server.js .
COPY --from=pruner /app/apps/omsorgspengerutbetaling-soknad/tokenx.js .
COPY --from=pruner /app/apps/omsorgspengerutbetaling-soknad/package.json .
COPY --from=pruner /app/apps/omsorgspengerutbetaling-soknad/src/build/scripts/decorator.js ./src/build/scripts/decorator.js
COPY --from=pruner /app/apps/omsorgspengerutbetaling-soknad/dist ./dist

EXPOSE 8080
CMD ["yarn","--cwd", "apps/omsorgspengerutbetaling-soknad", "start-express"]
