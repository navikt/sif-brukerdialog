FROM node:16-alpine

WORKDIR /usr/src/app
COPY api-mock.js .
COPY package.json .
COPY package-lock.json .
RUN npm ci
RUN apk update && apk add bash && apk add curl

EXPOSE 8082
CMD ["npm", "run", "start-api-mock"]
