FROM gcr.io/distroless/nodejs22-debian12:nonroot
WORKDIR /app

COPY --chown=nonroot:nonroot /apps/omsorgsdager-kalkulator/next.config.js .
COPY --chown=nonroot:nonroot /apps/omsorgsdager-kalkulator/.next/standalone ./
COPY --chown=nonroot:nonroot /apps/omsorgsdager-kalkulator/.next/static ./apps/omsorgsdager-kalkulator/.next/static
COPY --chown=nonroot:nonroot /apps/omsorgsdager-kalkulator/public ./public

ENV NODE_ENV=production
ENV PORT=8080

EXPOSE 8080

CMD ["apps/omsorgsdager-kalkulator/server.js"]