import { Preview } from '@storybook/react';
import '../src/components/process/process.css';
import '../src/style/global.css';

/** @type { import('@storybook/react').Preview } */
const preview: Preview = {
    parameters: {
        actions: { argTypesRegex: '^on[A-Z].*' },
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/i,
            },
        },
        options: {
            storySort: {
                method: 'alphabetical',
            },
        },
    },
};

export default preview;
