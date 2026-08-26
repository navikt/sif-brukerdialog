import type { Preview } from '@storybook/react-vite';
import '../src/app.css';

const preview: Preview = {
    parameters: {
        layout: 'fullscreen',
        options: {
            storySort: {
                method: 'alphabetical',
            },
        },
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/i,
            },
        },
        a11y: {
            test: 'todo',
        },
    },
};

export default preview;
