import { Preview } from '@storybook/react';
import { initUngDeltakelseOpplyserApiClient } from '@navikt/ung-common';
import { initialize, mswLoader } from 'msw-storybook-addon';
import '../src/app.css';

initialize();
initUngDeltakelseOpplyserApiClient();

const preview: Preview = {
    loaders: [mswLoader],
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
