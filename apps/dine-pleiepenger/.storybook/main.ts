// This file has been automatically migrated to valid ESM format by Storybook.
import { createRequire } from 'node:module';
import { join, dirname } from 'path';

const require = createRequire(import.meta.url);

/**
 * This function is used to resolve the absolute path of a package.
 * It is needed in projects that use Yarn PnP or are set up within a monorepo.
 */
function getAbsolutePath(value) {
    return dirname(require.resolve(join(value, 'package.json')));
}

/** @type { import('@storybook/nextjs').StorybookConfig } */
const config = {
    stories: ['../src/**/*.stories.@(ts|tsx)'],
    addons: [],

    framework: {
        name: getAbsolutePath('@storybook/nextjs'),
        options: {},
    },
};
export default config;
