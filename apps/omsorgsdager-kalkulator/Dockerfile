FROM europe-north1-docker.pkg.dev/cgr-nav/pull-through/nav.no/node:26-slim

WORKDIR /app

COPY --chown=65532:65532 /apps/omsorgsdager-kalkulator/next.config.js .
COPY --chown=65532:65532 /apps/omsorgsdager-kalkulator/.next/standalone ./
COPY --chown=65532:65532 /apps/omsorgsdager-kalkulator/.next/static ./apps/omsorgsdager-kalkulator/.next/static
COPY --chown=65532:65532 /apps/omsorgsdager-kalkulator/public ./public

ENV NODE_ENV=production
ENV PORT=8080

EXPOSE 8080

CMD ["apps/omsorgsdager-kalkulator/server.js"]

