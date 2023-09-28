require('dotenv').config();
const path = require('path');
const mustacheExpress = require('mustache-express');
const envSettings = require('../../../envSettings');

/* Start */

const configureDevServer = (decoratorFragments) => ({
    setupMiddlewares: (middlewares, devServer) => {
        devServer.app.engine('html', mustacheExpress());
        devServer.app.set('views', `${__dirname}/../../../dist/dev`);
        devServer.app.set('view engine', 'mustache');
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
        directory: path.resolve(`${__dirname}/../../../dist`),
        serveIndex: true,
        watch: false,
    },
    devMiddleware: {
        index: true,
        stats: 'minimal',
        publicPath: `${process.env.PUBLIC_PATH}/dist`,
    },
});

module.exports = configureDevServer;
