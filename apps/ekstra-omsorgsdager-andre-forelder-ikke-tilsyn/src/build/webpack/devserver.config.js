require('dotenv').config();
const mustacheExpress = require('mustache-express');
const envSettings = require('../../../envSettings');

/* Start */

const configureDevServer = (decoratorFragments) => ({
    setupMiddlewares: (middlewares, devServer) => {
        devServer.app.engine('html', mustacheExpress());
        devServer.app.set('views', `${__dirname}/../../../dist/dev`);
        devServer.app.set('view engine', 'mustache');
        devServer.app.get(`${process.env.PUBLIC_PATH}/dist/settings.js`, (req, res) => {
            res.set('content-type', 'application/javascript');
            res.send(`${envSettings()}`);
        });
        devServer.app.get('/dist/settings.js', (req, res) => {
            res.set('content-type', 'application/javascript');
            res.send(`${envSettings()}`);
        });
        devServer.app.get(/^\/(?!.*dist).*$/, (req, res) => {
            res.render('index.html', Object.assign(decoratorFragments));
        });
        return middlewares;
    },
    static: {
        watch: false,
    },
    devMiddleware: {
        stats: 'minimal',
        publicPath: `${process.env.PUBLIC_PATH}/dist`,
    },
    port: 8080,
});

module.exports = configureDevServer;
