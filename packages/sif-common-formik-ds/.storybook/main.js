import { join, dirname } from 'path';

function getAbsolutePath(value) {
    return dirname(require.resolve(join(value, 'package.json')));
}

module.exports = {
    stories: ['../storybook/**/*.stories.@(js|jsx|ts|tsx)'],
    addons: [
        getAbsolutePath('@storybook/addon-essentials'),
        getAbsolutePath('@storybook/addon-interactions'),
        getAbsolutePath('@storybook/addon-a11y'),
        getAbsolutePath('@storybook/preset-scss'),
    ],
    framework: {
        name: '@storybook/react-vite',
        options: {},
    },
};
