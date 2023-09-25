const process = require('process');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const webpackConfig = require('../webpack/webpack.config.dev');
const configureDevServer = require('../webpack/devserver.config');
const getDecorator = require('./decorator');

getDecorator().then((decoratorData) => {
    webpackConfig.output.publicPath = `${process.env.PUBLIC_PATH}/dist`;

    const compiler = webpack(webpackConfig);
    const server = new WebpackDevServer(configureDevServer(decoratorData), compiler);
    const host = process.env.HOST || 'localhost';
    const port = process.env.PORT || 8080;
    server.start(port, host, () => console.log(`Started WebpackDevServer on http://${host}:${port}`));
});
