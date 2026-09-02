FROM europe-north1-docker.pkg.dev/cgr-nav/pull-through/nav.no/node:26-slim

WORKDIR /app

COPY --chown=65532:65532 /apps/dine-pleiepenger/next.config.ts .
COPY --chown=65532:65532 /apps/dine-pleiepenger/.next/standalone ./
COPY --chown=65532:65532 /apps/dine-pleiepenger/.next/static ./apps/dine-pleiepenger/.next/static
COPY --chown=65532:65532 /apps/dine-pleiepenger/public ./public

ENV NODE_ENV=production
ENV PORT=8080

EXPOSE 8080

CMD ["apps/dine-pleiepenger/server.js"]