import { Preview } from '@storybook/react-vite';
// import 'react-loading-skeleton/dist/skeleton.css';
// import 'tailwindcss';
// import '@navikt/sif-common-core-ds/src/styles/sif-ds-theme.css';
import '../src/app.css';
// import '@navikt/ds-css/darkside';

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
