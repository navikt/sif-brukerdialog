const process = require('process');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const webpackConfig = require('../webpack/webpack.config.dev');
const configureDevServer = require('../webpack/devserver.config');

webpackConfig.output.publicPath = `${process.env.PUBLIC_PATH}/dist`;

const compiler = webpack(webpackConfig);
const server = new WebpackDevServer(configureDevServer({}), compiler);
const startupMessage = (port, hostname) => {
    console.log(`Started WebpackDevServer on http://${hostname}:${port}`);
};
server.start(
    process.env.PORT || 8080,
    process.env.HOST || 'localhost',
    startupMessage(process.env.PORT || 8080, process.env.HOST || 'localhost')
);
