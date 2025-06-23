import { join, dirname } from 'path';

function getAbsolutePath(value) {
    return dirname(require.resolve(join(value, 'package.json')));
}

export default {
    stories: ['../storybook/**/*.stories.@(ts|tsx)'],
    addons: [getAbsolutePath('@storybook/addon-docs')],
    framework: {
        name: getAbsolutePath('@storybook/react-vite'),
        options: {},
    },

    typescript: {
        reactDocgen: 'react-docgen-typescript-plugin',
    },
};
