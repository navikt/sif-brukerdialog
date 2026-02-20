FROM node:22-alpine

RUN apk add --no-cache tini \
    && addgroup --system --gid 1069 nodejs \
    && adduser --system --uid 1069 nextjs \
    && rm -rf /usr/local/lib/node_modules/npm /usr/local/bin/npm /usr/local/bin/npx /usr/local/bin/corepack

WORKDIR /app

COPY --chown=nextjs:nodejs /apps/dine-pleiepenger/next.config.ts .
COPY --chown=nextjs:nodejs /apps/dine-pleiepenger/.next/standalone ./
COPY --chown=nextjs:nodejs /apps/dine-pleiepenger/.next/static ./apps/dine-pleiepenger/.next/static
COPY --chown=nextjs:nodejs /apps/dine-pleiepenger/public ./public

USER nextjs

ENV NODE_ENV=production
ENV PORT=8080

EXPOSE 8080

ENTRYPOINT ["/sbin/tini", "--"]
CMD ["node", "apps/dine-pleiepenger/server.js"]