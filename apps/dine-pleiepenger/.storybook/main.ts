import { join, dirname } from 'path';

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
    docs: {
        autodocs: 'tag',
    },
};
export default config;
