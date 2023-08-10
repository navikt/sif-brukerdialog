const path = require('path');
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const webpackConfig = require('./webpack.config.global.js');

webpackConfig.plugins.push(
    new HtmlWebpackPlugin({
        template: './src/app/index.html',
        inject: 'body',
        alwaysWriteToDisk: true,
    }),
    new HtmlWebpackHarddiskPlugin({
        outputPath: path.resolve(__dirname, '../../../dist/dev'),
    }),
    new ESLintPlugin({
        extensions: ['ts', 'tsx'],
        failOnWarning: false,
    })
);

webpackConfig.module.rules.push({
    test: /\.js$/,
    use: ['source-map-loader'],
    enforce: 'pre',
    exclude: /node_modules/,
});

module.exports = Object.assign(webpackConfig, {
    mode: 'development',
    devtool: 'inline-source-map',
    optimization: {
        splitChunks: {
            chunks: 'all',
        },
    },
});
