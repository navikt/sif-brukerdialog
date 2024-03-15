module.exports = {
    stories: ['../storybook/**/*.stories.@(js|jsx|ts|tsx)'],
    addons: [
        '@storybook/addon-essentials',
        '@storybook/addon-interactions',
        '@storybook/addon-a11y',
        // 'storybook-formik/register',
    ],
    framework: {
        name: '@storybook/react-vite',
        options: {},
    },
};
