import { Preview } from '@storybook/react';
import '@navikt/ds-css';

const preview: Preview = {
    // globalTypes: {
    //     locale: {
    //         name: 'Språk',
    //         description: 'Velg språk som skal brukes i komponenten',
    //         defaultValue: 'nb',
    //         toolbar: {
    //             icon: 'globe',
    //             items: [
    //                 { value: 'nb', title: 'Bokmål' },
    //                 { value: 'nn', title: 'Nynorsk' },
    //             ],
    //         },
    //     },
    // },
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
