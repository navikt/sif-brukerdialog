const config = {
    stories: ['../src/storybook/**/*.stories.tsx', '../src/app/**/*.stories.tsx'],
    addons: ['@storybook/addon-essentials', '@storybook/addon-a11y'],
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
