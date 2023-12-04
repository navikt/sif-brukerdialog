
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

FROM gcr.io/distroless/nodejs18-debian11:nonroot
WORKDIR /apps/endringsmelding-pleiepenger
COPY --from=pruner /app/node_modules ./node_modules/
COPY --from=pruner /app/apps/endringsmelding-pleiepenger/server.cjs .
COPY --from=pruner /app/apps/endringsmelding-pleiepenger/tokenx.cjs .
COPY --from=pruner /app/apps/endringsmelding-pleiepenger/package.json .
COPY --from=pruner /app/apps/endringsmelding-pleiepenger/src/build/decorator.cjs ./src/build/decorator.cjs
COPY --from=pruner /app/apps/endringsmelding-pleiepenger/src/build/AppSettings.cjs ./src/build/AppSettings.cjs
COPY --from=pruner /app/apps/endringsmelding-pleiepenger/dist ./dist

EXPOSE 8080
CMD ["server.cjs"]
