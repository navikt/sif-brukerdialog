import { Preview } from '@storybook/react-vite';
import '../src/style/global.css';

/** @type { import('@storybook/react-vite').Preview } */
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
