FROM node:22-bookworm-slim

RUN apt-get update && apt-get upgrade -y && rm -rf /var/lib/apt/lists/* \
    && addgroup --system --gid 1069 nodejs \
    && adduser --system --uid 1069 nextjs

WORKDIR /app

COPY /apps/omsorgsdager-kalkulator/next.config.js .
COPY /apps/omsorgsdager-kalkulator/.next/standalone ./
COPY /apps/omsorgsdager-kalkulator/.next/static ./apps/omsorgsdager-kalkulator/.next/static
COPY /apps/omsorgsdager-kalkulator/public ./public

USER nextjs

ENV NODE_ENV=production
ENV PORT=8080

EXPOSE 8080

CMD ["node", "apps/omsorgsdager-kalkulator/server.js"]