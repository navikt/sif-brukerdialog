FROM gcr.io/distroless/nodejs18-debian12:nonroot
WORKDIR /app

COPY /apps/omsorgsdager-kalkulator/next.config.js .

COPY /apps/omsorgsdager-kalkulator/.next/standalone ./
COPY /apps/omsorgsdager-kalkulator/.next/static ./apps/omsorgsdager-kalkulator/.next/static

COPY /apps/omsorgsdager-kalkulator/public ./public

ENV NODE_ENV=production
ENV PORT 8080

EXPOSE 8080

CMD ["apps/omsorgsdager-kalkulator/server.js"]