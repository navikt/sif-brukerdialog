import type { Preview } from '@storybook/react-vite';
import '@navikt/ds-css';

const preview: Preview = {
    parameters: {
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

        a11y: {
            test: 'todo',
        },
    },
};

export default preview;
