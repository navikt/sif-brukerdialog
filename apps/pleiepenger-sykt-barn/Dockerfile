
FROM node:18-alpine AS base
RUN apk update && apk add git
RUN apk add --no-cache libc6-compat

RUN yarn global add turbo

WORKDIR /app

ENV SCOPE=@navikt/pleiepenger-sykt-barn

FROM base AS pruner
COPY . .
RUN yarn
RUN yarn turbo run build-app --filter=${SCOPE}

FROM pruner AS server
WORKDIR /apps/pleiepenger-sykt-barn
COPY --from=pruner /app/node_modules ./node_modules/
COPY --from=pruner /app/apps/pleiepenger-sykt-barn/server.cjs .
COPY --from=pruner /app/apps/pleiepenger-sykt-barn/tokenx.cjs .
COPY --from=pruner /app/apps/pleiepenger-sykt-barn/package.json .
COPY --from=pruner /app/apps/pleiepenger-sykt-barn/src/build/scripts/decorator.cjs ./src/build/scripts/decorator.cjs
COPY --from=pruner /app/apps/pleiepenger-sykt-barn/dist ./dist

EXPOSE 8080
CMD ["yarn","--cwd", "apps/pleiepenger-sykt-barn", "start-express"]
