// This file has been automatically migrated to valid ESM format by Storybook.
import { createRequire } from 'node:module';
import { join, dirname } from 'path';

const require = createRequire(import.meta.url);

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
