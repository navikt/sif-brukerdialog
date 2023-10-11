const config = {
    stories: ['../src/storybook/**/*.stories.tsx'],
    addons: [
        '@storybook/addon-essentials',
        '@storybook/addon-a11y',
        'storybook-formik/register',
        // '@storybook/preset-create-react-app',
    ],
    framework: {
        name: '@storybook/react-vite',
        options: {},
    },
    docs: {
        autodocs: false,
    },
    typescript: {
        reactDocgen: 'react-docgen-typescript-plugin',
    },
};

export default config;
