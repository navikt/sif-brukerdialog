FROM node:18-alpine AS base
RUN apk update && apk add git
RUN apk add --no-cache libc6-compat

RUN yarn global add turbo

WORKDIR /app

ENV SCOPE=@navikt/dine-pleiepenger

FROM base AS pruner
COPY . .
RUN yarn
RUN yarn turbo run build-app --filter=${SCOPE}

ENV NODE_ENV production

RUN addgroup --system --gid 1069 nodejs
RUN adduser --system --uid 1069 nextjs
USER nextjs

FROM pruner AS server
COPY --from=pruner /app/apps/dine-pleiepenger/next.config.js .
COPY --from=pruner /app/apps/dine-pleiepenger/package.json .
COPY --from=pruner --chown=nextjs:nodejs /app/apps/dine-pleiepenger/.next/standalone ./
COPY --from=pruner --chown=nextjs:nodejs /app/apps/dine-pleiepenger/.next/static ./.next/static
COPY --from=pruner --chown=nextjs:nodejs /app/apps/dine-pleiepenger/public ./public

EXPOSE 8080

ENV PORT 8080g

CMD ["node", "apps/dine-pleiepenger/server.js"]

