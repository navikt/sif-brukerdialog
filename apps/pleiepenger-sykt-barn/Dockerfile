
FROM node:18-alpine AS base

ENV SCOPE=@navikt/pleiepenger-sykt-barn

FROM base AS builder
RUN apk update && apk add git
RUN apk add --no-cache libc6-compat

WORKDIR /app
RUN yarn global add turbo
COPY . .
RUN yarn turbo prune ${SCOPE}

# Add lockfile and package.json's of isolated subworkspace
FROM base AS installer
RUN apk update
RUN apk add --no-cache libc6-compat
WORKDIR /app

# First install the dependencies (as they change less often)
COPY .gitignore .gitignore
COPY --from=builder /app/out/ .
COPY --from=builder /app/out/yarn.lock ./yarn.lock
RUN yarn install

# Build the project
COPY --from=builder /app/out/ .
COPY turbo.json turbo.json
RUN yarn turbo run build --filter=${SCOPE}

FROM base AS runner
WORKDIR /app

FROM gcr.io/distroless/nodejs18-debian11:nonroot
WORKDIR /apps/pleiepenger-sykt-barn
COPY --from=installer /app/node_modules ./node_modules/
COPY --from=installer /app/apps/pleiepenger-sykt-barn/server.cjs .
COPY --from=installer /app/apps/pleiepenger-sykt-barn/tokenx.cjs .
COPY --from=installer /app/apps/pleiepenger-sykt-barn/package.json .
COPY --from=installer /app/apps/pleiepenger-sykt-barn/src/build/decorator.cjs ./src/build/decorator.cjs
COPY --from=installer /app/apps/pleiepenger-sykt-barn/src/build/AppSettings.cjs ./src/build/AppSettings.cjs
COPY --from=installer /app/apps/pleiepenger-sykt-barn/dist ./dist

EXPOSE 8080
CMD ["server.cjs"]
