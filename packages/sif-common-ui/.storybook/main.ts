import type { StorybookConfig } from '@storybook/react-webpack5';

const config: StorybookConfig = {
    framework: '@storybook/react-webpack5',
    stories: ['../storybook/**/*.stories.@(ts|tsx)', '../src/**/*.stories.@(ts|tsx)'],
    addons: [
        '@storybook/addon-essentials',
        {
            name: '@storybook/addon-styling',
            options: {
                sass: {
                    implementation: require('sass'),
                },
            },
        },
    ],
    webpackFinal: async (config) => {
        config.module.rules.push({
            test: /\.(ts|tsx)$/,
            use: [
                {
                    loader: require.resolve('ts-loader'),
                    options: {
                        reportFiles: ['../**/src/**/*.{ts,tsx}'],
                    },
                },
            ],
        });
        config.resolve.extensions.push('.ts', '.tsx');
        return config;
    },
    docs: {
        autodocs: 'tag',
    },
};

export default config;
