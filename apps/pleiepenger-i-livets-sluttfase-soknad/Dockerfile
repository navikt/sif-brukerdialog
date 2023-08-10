
FROM node:16-alpine AS base
RUN apk update && apk add git
RUN apk add --no-cache libc6-compat

RUN yarn global add turbo

WORKDIR /app

ENV SCOPE=@navikt/pleiepenger-i-livets-sluttfase-soknad

FROM base AS pruner
COPY . .
RUN yarn
RUN yarn turbo run build-app --filter=${SCOPE}

FROM pruner AS server
WORKDIR /apps/pleiepenger-i-livets-sluttfase-soknad
COPY --from=pruner /app/node_modules ./node_modules/
COPY --from=pruner /app/apps/pleiepenger-i-livets-sluttfase-soknad/envSettings.js .
COPY --from=pruner /app/apps/pleiepenger-i-livets-sluttfase-soknad/server.js .
COPY --from=pruner /app/apps/pleiepenger-i-livets-sluttfase-soknad/tokenx.js .
COPY --from=pruner /app/apps/pleiepenger-i-livets-sluttfase-soknad/package.json .
COPY --from=pruner /app/apps/pleiepenger-i-livets-sluttfase-soknad/src/build/scripts/decorator.js ./src/build/scripts/decorator.js
COPY --from=pruner /app/apps/pleiepenger-i-livets-sluttfase-soknad/dist ./dist

EXPOSE 8080
CMD ["yarn","--cwd", "apps/pleiepenger-i-livets-sluttfase-soknad", "start-express"]
