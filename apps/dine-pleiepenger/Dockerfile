FROM gcr.io/distroless/nodejs18-debian12:nonroot
WORKDIR /app

COPY /apps/dine-pleiepenger/next.config.js .
COPY /apps/dine-pleiepenger/.next/standalone ./
COPY /apps/dine-pleiepenger/.next/static ./apps/dine-pleiepenger/.next/static

COPY /apps/dine-pleiepenger/public ./public

ENV NODE_ENV=production
ENV PORT 8080

EXPOSE 8080

CMD ["apps/dine-pleiepenger/server.js"]