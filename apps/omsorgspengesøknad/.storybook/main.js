const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');

module.exports = {
    stories: ['../src/storybook/**/*.stories.mdx', '../src/storybook/**/*.stories.@(js|jsx|ts|tsx)'],
    addons: ['@storybook/addon-essentials', '@storybook/addon-a11y', 'storybook-formik/register'],
    framework: '@storybook/react',
    core: {
        builder: '@storybook/builder-webpack5',
    },
    webpackFinal: async (config, { configType }) => {
        //Fjern default svg-loader
        config.module.rules = config.module.rules.map((data) => {
            if (/svg\|/.test(String(data.test))) {
                data.test = /\.(ico|jpg|jpeg|png|gif|eot|otf|webp|ttf|woff|woff2|cur|ani)(\?.*)?$/;
            }
            return data;
        });

        config.devtool = 'source-map';

        // Make whatever fine-grained changes you need
        config.module.rules = config.module.rules.concat(
            {
                test: /\.svg$/,
                use: { loader: 'svg-sprite-loader', options: {} },
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    // Creates `style` nodes from JS strings
                    'style-loader',
                    // Translates CSS into CommonJS
                    'css-loader',
                    // Compiles Sass to CSS
                    'sass-loader',
                ],
            },
            {
                test: /\.less$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    {
                        loader: 'less-loader',
                        options: {
                            lessOptions: {
                                math: 'always',
                            },
                        },
                    },
                ],
            }
        );

        config.plugins.push(
            new MiniCssExtractPlugin({
                filename: 'css/[name].css?[hash]-[chunkhash]-[contenthash]-[name]',
            })
        );

        config.resolve.extensions.push('.ts', '.tsx');

        // Return the altered config
        return config;
    },
};
