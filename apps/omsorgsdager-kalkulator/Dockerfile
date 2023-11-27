FROM gcr.io/distroless/nodejs18-debian11:nonroot
WORKDIR /app

COPY /apps/omsorgsdager-kalkulator/package.json ./
COPY /apps/omsorgsdager-kalkulator/.next/standalone ./
COPY /apps/omsorgsdager-kalkulator/public ./public

EXPOSE 8080
ENV NODE_ENV=production

CMD ["./apps/omsorgsdager-kalkulator/server.js"]