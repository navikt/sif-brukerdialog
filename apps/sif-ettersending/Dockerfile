
FROM node:18-alpine AS base
RUN apk update && apk add git
RUN apk add --no-cache libc6-compat

RUN yarn global add turbo

WORKDIR /app

ENV SCOPE=@navikt/sif-ettersending

FROM base AS turbo-builder
COPY . .
RUN yarn
RUN yarn turbo run build --filter=${SCOPE}

FROM base AS ws-installer
COPY . .
RUN yarn workspaces focus --all --production

FROM gcr.io/distroless/nodejs18-debian11:nonroot
WORKDIR /apps/sif-ettersending
COPY --from=ws-installer /app/node_modules ./node_modules/
COPY --from=turbo-builder /app/apps/sif-ettersending/server.cjs .
COPY --from=turbo-builder /app/apps/sif-ettersending/tokenx.cjs .
COPY --from=turbo-builder /app/apps/sif-ettersending/package.json .
COPY --from=turbo-builder /app/apps/sif-ettersending/src/build/decorator.cjs ./src/build/decorator.cjs
COPY --from=turbo-builder /app/apps/sif-ettersending/src/build/AppSettings.cjs ./src/build/AppSettings.cjs
COPY --from=turbo-builder /app/apps/sif-ettersending/dist ./dist

EXPOSE 8080
CMD ["server.cjs"]
