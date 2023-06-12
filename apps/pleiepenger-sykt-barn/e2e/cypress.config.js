const { defineConfig } = require('cypress');

module.exports = defineConfig({
    e2e: {
        baseUrl: 'http://localhost:8080',
        testIsolation: false,
        // projectId: 'fnodxc',
        // We've imported your old cypress plugins here.
        // You may want to clean this up later by importing these.
        requestTimeout: 10000,
        setupNodeEvents(on, config) {
            return require('./cypress/plugins/index.js')(on, config);
        },
        video: false,
    },
});
