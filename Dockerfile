FROM gcr.io/distroless/nodejs18-debian11
ARG APP_NAME

LABEL org.opencontainers.image.title=${APP_NAME}

WORKDIR /app

# Required by server.cjs
COPY /node_modules/ /node_modules/

# Local files
COPY /apps/${APP_NAME}/server.cjs .
COPY /apps/${APP_NAME}/tokenx.cjs .
COPY /apps/${APP_NAME}/package.json .
COPY /apps/${APP_NAME}/src/build/decorator.cjs ./src/build/decorator.cjs
COPY /apps/${APP_NAME}/dist ./dist

EXPOSE 8080
CMD ["server.cjs"]
