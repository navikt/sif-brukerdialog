import { join, dirname } from 'path';

function getAbsolutePath(value) {
    return dirname(require.resolve(join(value, 'package.json')));
}

export default {
    stories: ['../src/**/*.stories.@(ts|tsx)'],
    addons: [getAbsolutePath('@storybook/addon-a11y'), getAbsolutePath('storybook/internal/toolbars')],
    framework: {
        name: '@storybook/react-vite',
        options: {},
    },
};
