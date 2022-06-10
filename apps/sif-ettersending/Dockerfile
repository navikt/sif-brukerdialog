
FROM node:16.15.1-alpine AS base
RUN apk update && apk add git

WORKDIR /app

ENV SCOPE=@navikt/sif-ettersending
ENV YARN_CACHE_FOLDER=.yarn-cache

FROM base AS pruner
RUN yarn global add turbo
COPY  /sif-common-packages/config/ ./sif-common-packages/config/
COPY . .
RUN turbo prune --scope=${SCOPE} --docker

FROM base AS dev-deps
COPY --from=pruner /app/out/json/ .
COPY --from=pruner /app/out/yarn.lock ./yarn.lock
RUN yarn install

# FROM base AS prod-deps
# COPY --from=pruner /app/out/json/ .
# COPY --from=pruner /app/out/yarn.lock ./yarn.lock
# COPY --from=dev-deps /app/{YARN_CACHE_FOLDER} .
# RUN yarn install --production
# RUN rm -rf /app/${YARN_CACHE_FOLDER}

FROM base AS builder
COPY --from=dev-deps /app/ .
COPY --from=pruner /app/out/full/ .
COPY  /sif-common-packages/config/ ./sif-common-packages/config/
RUN yarn turbo run build --scope=${SCOPE}

FROM base AS runner
# COPY --from=prod-deps /app/ .
COPY --from=builder /app/ .
EXPOSE 8080
CMD ["yarn","--cwd", "apps/sif-ettersending", "start-express"]
# CMD yarn start-express
