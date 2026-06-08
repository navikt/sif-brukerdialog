// This file has been automatically migrated to valid ESM format by Storybook.
import { createRequire } from 'node:module';
import { join, dirname } from 'path';

const require = createRequire(import.meta.url);

function getAbsolutePath(value) {
    return dirname(require.resolve(join(value, 'package.json')));
}

export default {
    stories: ['../src/**/*.stories.tsx'],
    addons: [getAbsolutePath('@storybook/addon-a11y'), getAbsolutePath('@storybook/addon-docs')],
    framework: {
        name: getAbsolutePath('@storybook/react-vite'),
        options: {},
    },

    typescript: {
        reactDocgen: 'react-docgen-typescript-plugin',
    },
};
