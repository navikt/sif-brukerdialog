# Use Debian as intermediate stage to update vulnerable packages
FROM debian:12-slim AS security-update
RUN apt-get update && apt-get upgrade -y libssl3 && rm -rf /var/lib/apt/lists/*

FROM gcr.io/distroless/nodejs22-debian12:nonroot
WORKDIR /app

# Copy updated libssl3 from security-update stage
COPY --from=security-update /usr/lib/x86_64-linux-gnu/libssl.so.3 /usr/lib/x86_64-linux-gnu/libssl.so.3
COPY --from=security-update /usr/lib/x86_64-linux-gnu/libcrypto.so.3 /usr/lib/x86_64-linux-gnu/libcrypto.so.3

COPY /apps/dine-pleiepenger/next.config.ts .
COPY /apps/dine-pleiepenger/.next/standalone ./
COPY /apps/dine-pleiepenger/.next/static ./apps/dine-pleiepenger/.next/static

COPY /apps/dine-pleiepenger/public ./public

ENV NODE_ENV=production
ENV PORT=8080

EXPOSE 8080

CMD ["apps/dine-pleiepenger/server.js"]