FROM gcr.io/distroless/nodejs18-debian11
ARG APP_NAME

LABEL org.opencontainers.image.title=${APP_NAME}

WORKDIR /app

# Required by server.cjs
COPY /node_modules/express /node_modules/express
COPY /node_modules/express-rate-limit /node_modules/express-rate-limit
COPY /node_modules/mustache-express /node_modules/mustache-express
COPY /node_modules/compression /node_modules/compression
COPY /node_modules/cookie-parser /node_modules/cookie-parser
COPY /node_modules/uuid /node_modules/uuid
COPY /node_modules/http-proxy-middleware /node_modules/http-proxy-middleware

# Local files
COPY /apps/${APP_NAME}/server.cjs .
COPY /apps/${APP_NAME}/tokenx.cjs .
COPY /apps/${APP_NAME}/package.json .
COPY /apps/${APP_NAME}/src/build/decorator.cjs ./src/build/decorator.cjs
COPY /apps/${APP_NAME}/dist ./dist

EXPOSE 8080
CMD ["server.cjs"]
