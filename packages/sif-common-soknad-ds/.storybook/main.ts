export default {
    stories: ['../storybook/**/*.stories.@(js|jsx|ts|tsx)', '../src/**/*.stories.@(ts|tsx)'],
    addons: [
        '@storybook/addon-essentials',
        '@storybook/addon-interactions',
        '@storybook/addon-a11y',
        'storybook-formik/register',
        '@storybook/addon-toolbars',
    ],
    framework: {
        name: '@storybook/react-vite',
        options: {},
    },
};
