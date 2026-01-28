# Use Debian as intermediate stage to update vulnerable packages
FROM debian:12-slim AS security-update
RUN apt-get update && apt-get upgrade -y libssl3 && rm -rf /var/lib/apt/lists/*

FROM gcr.io/distroless/nodejs22-debian12:nonroot
WORKDIR /app

# Copy updated libssl3 from security-update stage
COPY --from=security-update /usr/lib/x86_64-linux-gnu/libssl.so.3 /usr/lib/x86_64-linux-gnu/libssl.so.3
COPY --from=security-update /usr/lib/x86_64-linux-gnu/libcrypto.so.3 /usr/lib/x86_64-linux-gnu/libcrypto.so.3

COPY /apps/omsorgsdager-kalkulator/next.config.js .

COPY /apps/omsorgsdager-kalkulator/.next/standalone ./
COPY /apps/omsorgsdager-kalkulator/.next/static ./apps/omsorgsdager-kalkulator/.next/static

COPY /apps/omsorgsdager-kalkulator/public ./public

ENV NODE_ENV=production
ENV PORT=8080

EXPOSE 8080

CMD ["apps/omsorgsdager-kalkulator/server.js"]