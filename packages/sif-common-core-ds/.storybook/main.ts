module.exports = {
    stories: ['../storybook/**/*.stories.@(js|jsx|ts|tsx)', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
    addons: [
        '@storybook/addon-essentials',
        '@storybook/addon-interactions',
        '@storybook/addon-a11y',
        {
            name: '@storybook/addon-styling',
            options: {
                sass: {
                    implementation: require('sass'),
                },
            },
        },
    ],
    framework: {
        name: '@storybook/react-vite',
        options: {},
    },
};
