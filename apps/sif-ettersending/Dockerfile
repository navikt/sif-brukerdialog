FROM gcr.io/distroless/nodejs18-debian11:nonroot
WORKDIR /apps/sif-ettersending
COPY --from=pruner /app/node_modules ./node_modules/
COPY --from=pruner /app/apps/sif-ettersending/server.cjs .
COPY --from=pruner /app/apps/sif-ettersending/tokenx.cjs .
COPY --from=pruner /app/apps/sif-ettersending/package.json .
COPY --from=pruner /app/apps/sif-ettersending/src/build/decorator.cjs ./src/build/decorator.cjs
COPY --from=pruner /app/apps/sif-ettersending/src/build/AppSettings.cjs ./src/build/AppSettings.cjs
COPY --from=pruner /app/apps/sif-ettersending/dist ./dist

EXPOSE 8080
CMD ["server.cjs"]
