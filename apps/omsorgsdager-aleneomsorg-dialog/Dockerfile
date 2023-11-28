FROM gcr.io/distroless/nodejs18-debian11:nonroot
WORKDIR /apps/omsorgsdager-aleneomsorg-dialog
COPY --from=pruner /app/node_modules ./node_modules/
COPY --from=pruner /app/apps/omsorgsdager-aleneomsorg-dialog/server.cjs .
COPY --from=pruner /app/apps/omsorgsdager-aleneomsorg-dialog/tokenx.cjs .
COPY --from=pruner /app/apps/omsorgsdager-aleneomsorg-dialog/package.json .
COPY --from=pruner /app/apps/omsorgsdager-aleneomsorg-dialog/src/build/decorator.cjs ./src/build/decorator.cjs
COPY --from=pruner /app/apps/omsorgsdager-aleneomsorg-dialog/src/build/AppSettings.cjs ./src/build/AppSettings.cjs
COPY --from=pruner /app/apps/omsorgsdager-aleneomsorg-dialog/dist ./dist

EXPOSE 8080
CMD ["server.cjs"]
