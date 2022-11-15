
FROM node:16-alpine AS base
RUN apk update && apk add git
RUN yarn global add turbo@1.5.5

WORKDIR /app

ENV SCOPE=@navikt/sif-ettersending

FROM base AS pruner
COPY . .
RUN yarn
RUN yarn turbo run build-app --filter=${SCOPE}

FROM pruner AS server
WORKDIR /apps/sif-ettersending
COPY --from=pruner /app/node_modules ./node_modules/
COPY --from=pruner /app/apps/sif-ettersending/node_modules ./node_modules/
COPY --from=pruner /app/apps/sif-ettersending/envSettings.js .
COPY --from=pruner /app/apps/sif-ettersending/server.js .
COPY --from=pruner /app/apps/sif-ettersending/tokenx.js .
COPY --from=pruner /app/apps/sif-ettersending/package.json .
COPY --from=pruner /app/apps/sif-ettersending/src/build/scripts/decorator.js ./src/build/scripts/decorator.js
COPY --from=pruner /app/apps/sif-ettersending/dist ./dist

EXPOSE 8080
CMD ["yarn","--cwd", "apps/sif-ettersending", "start-express"]
