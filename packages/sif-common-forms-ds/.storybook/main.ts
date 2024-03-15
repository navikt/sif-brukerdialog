export default {
    stories: ['../src/**/*.stories.@(ts|tsx)', '../storybook/**/*.stories.@(js|jsx|ts|tsx)'],
    addons: [
        '@storybook/addon-essentials',
        '@storybook/addon-interactions',
        '@storybook/addon-a11y',
        // 'storybook-formik/register',
        '@storybook/addon-toolbars',
    ],
    framework: {
        name: '@storybook/react-vite',
        options: {},
    },
};
