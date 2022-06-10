
FROM node:alpine AS base
RUN apk update && apk add git

## Globally install turbo
RUN npm i -g turbo

## Globally install husky
RUN npm i -g husky

# Prune the workspace for the `sif-ettersending` app
FROM base as pruner
COPY .git ./.git
COPY . .
RUN turbo prune --scope=@navikt/sif-ettersending

# Add pruned lockfile and package.json's of the pruned subworkspace
FROM pruner AS installer
COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/yarn.lock ./yarn.lock
# Install only the deps needed to build the target
RUN yarn install

# Copy source code of pruned subworkspace and build
FROM installer as builder
WORKDIR /app
COPY --from=pruner .git ./.git
COPY --from=installer /app/ .
COPY --from=builder /app/out/full/ .
RUN turbo run build --scope=@navikt/sif-ettersending

# Start the app
FROM builder as runner
EXPOSE 8080
CMD ["yarn","--cwd", "apps/sif-ettersending", "start-express"]

# EXPOSE 3000
# RUN ['yarn', '--cwd', 'apps/@navikt/sif-ettersending', 'start']


# FROM node:16

# WORKDIR /usr/src/app

# COPY dist ./dist
# COPY server.js .
# COPY tokenx.js .
# COPY node_modules ./node_modules
# COPY package.json .
# COPY src/build/scripts/decorator.js ./src/build/scripts/decorator.js
# COPY envSettings.js ./envSettings.js

# EXPOSE 8080
# CMD ["yarn", "start-express"]
