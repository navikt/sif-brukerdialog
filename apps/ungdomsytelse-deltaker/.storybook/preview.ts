import { Preview } from '@storybook/react-vite';
import '../src/app.css';
import 'tailwindcss';
import '@navikt/ds-css/darkside';
import '@navikt/sif-common-core-ds/src/styles/sif-ds-theme.css';
import 'react-loading-skeleton/dist/skeleton.css';

const preview: Preview = {
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
