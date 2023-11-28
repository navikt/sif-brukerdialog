FROM gcr.io/distroless/nodejs18-debian11:nonroot
WORKDIR /apps/omsorgspengerutbetaling-soknad
COPY --from=pruner /app/node_modules ./node_modules/
COPY --from=pruner /app/apps/omsorgspengerutbetaling-soknad/server.cjs .
COPY --from=pruner /app/apps/omsorgspengerutbetaling-soknad/tokenx.cjs .
COPY --from=pruner /app/apps/omsorgspengerutbetaling-soknad/package.json .
COPY --from=pruner /app/apps/omsorgspengerutbetaling-soknad/src/build/decorator.cjs ./src/build/decorator.cjs
COPY --from=pruner /app/apps/omsorgspengerutbetaling-soknad/src/build/AppSettings.cjs ./src/build/AppSettings.cjs
COPY --from=pruner /app/apps/omsorgspengerutbetaling-soknad/dist ./dist

EXPOSE 8080
CMD ["server.cjs"]
