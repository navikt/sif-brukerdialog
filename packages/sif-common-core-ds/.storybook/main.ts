import { join, dirname } from 'path';

function getAbsolutePath(value) {
    return dirname(require.resolve(join(value, 'package.json')));
}

const config = {
    stories: ['../src/**/*.stories.@(ts|tsx)', '../storybook/**/*.stories.@(js|jsx|ts|tsx)'],

    addons: [getAbsolutePath('@storybook/addon-docs')],

    framework: {
        name: getAbsolutePath('@storybook/react-vite'),
        options: {},
    },

    typescript: {
        reactDocgen: 'react-docgen-typescript-plugin',
    },
};

export default config;
