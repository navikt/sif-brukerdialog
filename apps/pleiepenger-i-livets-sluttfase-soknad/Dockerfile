FROM gcr.io/distroless/nodejs18-debian11:nonroot
WORKDIR /apps/pleiepenger-i-livets-sluttfase-soknad
COPY --from=pruner /app/node_modules ./node_modules/
COPY --from=pruner /app/apps/pleiepenger-i-livets-sluttfase-soknad/server.cjs .
COPY --from=pruner /app/apps/pleiepenger-i-livets-sluttfase-soknad/tokenx.cjs .
COPY --from=pruner /app/apps/pleiepenger-i-livets-sluttfase-soknad/package.json .
COPY --from=pruner /app/apps/pleiepenger-i-livets-sluttfase-soknad/src/build/decorator.cjs ./src/build/decorator.cjs
COPY --from=pruner /app/apps/pleiepenger-i-livets-sluttfase-soknad/src/build/AppSettings.cjs ./src/build/AppSettings.cjs
COPY --from=pruner /app/apps/pleiepenger-i-livets-sluttfase-soknad/dist ./dist

EXPOSE 8080
CMD ["server.cjs"]
