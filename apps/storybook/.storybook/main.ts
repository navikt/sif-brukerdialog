import { join, dirname } from 'path';

function getAbsolutePath(value) {
    return dirname(require.resolve(join(value, 'package.json')));
}

export default {
    stories: ['../storybook/**/*.stories.@(ts|tsx)'],
    addons: [
        getAbsolutePath('@storybook/addon-essentials'),
        getAbsolutePath('@storybook/addon-interactions'),
        getAbsolutePath('@storybook/addon-a11y'),
        getAbsolutePath('@storybook/addon-toolbars'),
    ],
    framework: {
        name: '@storybook/react-vite',
        options: {},
    },
    env: {
        ENV: 'abc',
    },
};
