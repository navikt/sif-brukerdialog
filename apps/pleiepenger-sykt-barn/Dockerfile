FROM gcr.io/distroless/nodejs18-debian11:nonroot
WORKDIR /apps/pleiepenger-sykt-barn
COPY --from=pruner /app/node_modules ./node_modules/
COPY --from=pruner /app/apps/pleiepenger-sykt-barn/server.cjs .
COPY --from=pruner /app/apps/pleiepenger-sykt-barn/tokenx.cjs .
COPY --from=pruner /app/apps/pleiepenger-sykt-barn/package.json .
COPY --from=pruner /app/apps/pleiepenger-sykt-barn/src/build/decorator.cjs ./src/build/decorator.cjs
COPY --from=pruner /app/apps/pleiepenger-sykt-barn/src/build/AppSettings.cjs ./src/build/AppSettings.cjs
COPY --from=pruner /app/apps/pleiepenger-sykt-barn/dist ./dist

EXPOSE 8080
CMD ["server.cjs"]
