FROM cypress/included:12.8.1
WORKDIR /usr/src/app
COPY . .
RUN CYPRESS_INSTALL_BINARY=0 npm ci
CMD ["npx", "run", "cypress"]