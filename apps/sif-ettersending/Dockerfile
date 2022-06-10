
FROM node:16.15.1-alpine AS base
RUN apk update && apk add git

RUN yarn global add turbo

ENV SCOPE=@navikt/sif-ettersending

FROM base AS pruner
COPY . .
RUN turbo prune --scope=@navikt/sif-ettersending --docker=true

FROM pruner AS builder
WORKDIR /app/
COPY --from=pruner /sif-common-packages/config ./sif-common-packages/config
COPY --from=pruner /out/full/ .
COPY --from=pruner /yarn.lock .
RUN yarn install --ignore-scripts
RUN turbo run build --filter=@navikt/sif-brukerdialog

FROM builder AS prepper
WORKDIR /prep/
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/apps/sif-ettersending/node_modules ./node_modules
COPY --from=builder /app/apps/sif-ettersending/dist ./dist
COPY --from=pruner /apps/sif-ettersending/envSettings.js .
COPY --from=pruner /apps/sif-ettersending/server.js .
COPY --from=pruner /apps/sif-ettersending/tokenx.js .
COPY --from=pruner /apps/sif-ettersending/package.json .
COPY --from=pruner /apps/sif-ettersending/src/build/scripts/decorator.js ./src/build/scripts/decorator.js


# EXPOSE 8080
# CMD ["yarn","--cwd", "apps/sif-ettersending", "start-express"]
