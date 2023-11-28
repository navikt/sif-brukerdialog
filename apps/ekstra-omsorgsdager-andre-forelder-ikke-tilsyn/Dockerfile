FROM gcr.io/distroless/nodejs18-debian11:nonroot
WORKDIR /apps/ekstra-omsorgsdager-andre-forelder-ikke-tilsyn
COPY --from=pruner /app/node_modules ./node_modules/
COPY --from=pruner /app/apps/ekstra-omsorgsdager-andre-forelder-ikke-tilsyn/server.cjs .
COPY --from=pruner /app/apps/ekstra-omsorgsdager-andre-forelder-ikke-tilsyn/tokenx.cjs .
COPY --from=pruner /app/apps/ekstra-omsorgsdager-andre-forelder-ikke-tilsyn/package.json .
COPY --from=pruner /app/apps/ekstra-omsorgsdager-andre-forelder-ikke-tilsyn/src/build/decorator.cjs ./src/build/decorator.cjs
COPY --from=pruner /app/apps/ekstra-omsorgsdager-andre-forelder-ikke-tilsyn/src/build/AppSettings.cjs ./src/build/AppSettings.cjs
COPY --from=pruner /app/apps/ekstra-omsorgsdager-andre-forelder-ikke-tilsyn/dist ./dist

EXPOSE 8080
CMD ["server.cjs"]
