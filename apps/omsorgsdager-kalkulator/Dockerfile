FROM node:18-alpine AS base
RUN apk update && apk add git
RUN apk add --no-cache libc6-compat

RUN yarn global add turbo

WORKDIR /app

ENV SCOPE=@navikt/omsorgsdager-kalkulator

FROM base AS pruner
COPY . .
RUN yarn
RUN yarn turbo run build-app --filter=${SCOPE}

ENV NODE_ENV production

RUN addgroup --system --gid 1069 nodejs
RUN adduser --system --uid 1069 nextjs
USER nextjs

FROM gcr.io/distroless/nodejs18-debian11:nonroot
COPY --from=pruner /app/apps/omsorgsdager-kalkulator/next.config.js .
COPY --from=pruner /app/apps/omsorgsdager-kalkulator/package.json .

COPY --from=pruner --chown=nextjs:nodejs /app/apps/omsorgsdager-kalkulator/.next/standalone ./
COPY --from=pruner --chown=nextjs:nodejs /app/apps/omsorgsdager-kalkulator/.next/static ./.next/static
COPY --from=pruner --chown=nextjs:nodejs /app/apps/omsorgsdager-kalkulator/public ./public


EXPOSE 8080

ENV PORT 8080g

CMD ["apps/omsorgsdager-kalkulator/server.js"]

