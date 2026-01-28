FROM gcr.io/distroless/nodejs22-debian12:nonroot
WORKDIR /app

COPY --chown=nonroot:nonroot /apps/dine-pleiepenger/next.config.ts .
COPY --chown=nonroot:nonroot /apps/dine-pleiepenger/.next/standalone ./
COPY --chown=nonroot:nonroot /apps/dine-pleiepenger/.next/static ./apps/dine-pleiepenger/.next/static
COPY --chown=nonroot:nonroot /apps/dine-pleiepenger/public ./public

ENV NODE_ENV=production
ENV PORT=8080

EXPOSE 8080

CMD ["apps/dine-pleiepenger/server.js"]