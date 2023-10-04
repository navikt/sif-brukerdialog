
FROM gcr.io/distroless/nodejs18-debian11
WORKDIR /app
COPY /node_modules ./node_modules/
COPY /apps/pleiepenger-sykt-barn/envSettings.js .
COPY /apps/pleiepenger-sykt-barn/server.js .
COPY /apps/pleiepenger-sykt-barn/tokenx.js .
COPY /apps/pleiepenger-sykt-barn/package.json .
COPY /apps/pleiepenger-sykt-barn/src/build/scripts/decorator.js ./src/build/scripts/decorator.js
COPY /apps/pleiepenger-sykt-barn/dist ./dist

EXPOSE 8080
CMD ["server.js"]