import { join, dirname } from 'path';

function getAbsolutePath(value) {
    return dirname(require.resolve(join(value, 'package.json')));
}

const config = {
    stories: ['../src/storybook/**/*.stories.tsx', '../src/app/**/*.stories.tsx'],
    addons: [getAbsolutePath('@storybook/addon-essentials'), getAbsolutePath('@storybook/addon-a11y')],
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
