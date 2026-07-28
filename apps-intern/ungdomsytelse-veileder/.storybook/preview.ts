import { Preview } from '@storybook/react-vite';
import initialize from 'msw-storybook-addon';
import { mswLoader } from 'msw-storybook-addon/csf3';
import '@navikt/ds-css';

initialize();

const preview: Preview = {
    loaders: [mswLoader()],
    parameters: {
        actions: { argTypesRegex: '^on[A-Z].*' },
        options: {
            storySort: {
                method: 'alphabetical',
            },
        },
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/,
            },
        },
    },
};

export default preview;
