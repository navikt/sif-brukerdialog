FROM node:16.15.1-alpine AS base
RUN apk update && apk add git
RUN npm i turbo -g

WORKDIR /app

ENV SCOPE=@navikt/ekstra-omsorgsdager-andre-forelder-ikke-tilsyn

FROM base AS pruner
COPY . .
RUN npm install
RUN npx turbo run build-app --filter=${SCOPE}

FROM pruner AS server
WORKDIR /apps/ekstra-omsorgsdager-andre-forelder-ikke-tilsyn

COPY --from=pruner /app/node_modules ./node_modules/
COPY --from=pruner /app/apps/ekstra-omsorgsdager-andre-forelder-ikke-tilsyn/node_modules ./node_modules/
COPY --from=pruner /app/apps/ekstra-omsorgsdager-andre-forelder-ikke-tilsyn/envSettings.js .
COPY --from=pruner /app/apps/ekstra-omsorgsdager-andre-forelder-ikke-tilsyn/server.js .
COPY --from=pruner /app/apps/ekstra-omsorgsdager-andre-forelder-ikke-tilsyn/tokenx.js .
COPY --from=pruner /app/apps/ekstra-omsorgsdager-andre-forelder-ikke-tilsyn/package.json .
COPY --from=pruner /app/apps/ekstra-omsorgsdager-andre-forelder-ikke-tilsyn/src/build/scripts/decorator.js ./src/build/scripts/decorator.js
COPY --from=pruner /app/apps/ekstra-omsorgsdager-andre-forelder-ikke-tilsyn/dist ./dist

EXPOSE 8080
CMD ["npm","run","--cwd", "apps/ekstra-omsorgsdager-andre-forelder-ikke-tilsyn", "start-express"]
