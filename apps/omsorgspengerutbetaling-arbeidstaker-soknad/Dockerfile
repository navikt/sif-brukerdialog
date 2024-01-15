
FROM node:18-alpine AS base
RUN apk update && apk add git
RUN apk add --no-cache libc6-compat

RUN yarn global add turbo

WORKDIR /app

ENV SCOPE=@navikt/omsorgspengerutbetaling-arbeidstaker-soknad

FROM base AS pruner
COPY . .
RUN yarn
RUN yarn turbo run build --filter=${SCOPE}

FROM gcr.io/distroless/nodejs18-debian11:nonroot
WORKDIR /apps/omsorgspengerutbetaling-arbeidstaker-soknad
COPY --from=pruner /app/node_modules ./node_modules/
COPY --from=pruner /app/apps/omsorgspengerutbetaling-arbeidstaker-soknad/server.cjs .
COPY --from=pruner /app/apps/omsorgspengerutbetaling-arbeidstaker-soknad/tokenx.cjs .
COPY --from=pruner /app/apps/omsorgspengerutbetaling-arbeidstaker-soknad/package.json .
COPY --from=pruner /app/apps/omsorgspengerutbetaling-arbeidstaker-soknad/src/build/decorator.cjs ./src/build/decorator.cjs
COPY --from=pruner /app/apps/omsorgspengerutbetaling-arbeidstaker-soknad/src/build/AppSettings.cjs ./src/build/AppSettings.cjs
COPY --from=pruner /app/apps/omsorgspengerutbetaling-arbeidstaker-soknad/dist ./dist

EXPOSE 8080
CMD ["server.cjs"]
