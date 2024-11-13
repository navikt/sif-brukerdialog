import { Preview } from '@storybook/react';
import { v4 as uuidv4 } from 'uuid';
import { http, HttpResponse } from 'msw';
import { initialize, mswLoader } from 'msw-storybook-addon';
import '@navikt/ds-css';

initialize();

export const handlers = [
    http.post(
        'http://localhost:6006/familie/sykdom-i-familien/soknad/omsorgspenger/api/k9-brukerdialog/vedlegg',
        () => {
            return HttpResponse.json({}, { headers: { location: `vedlegg/${uuidv4()}` } });
        },
    ),
];

const preview: Preview = {
    globalTypes: {
        locale: {
            name: 'Språk',
            description: 'Velg språk som skal brukes i komponenten',
            defaultValue: 'nb',
            toolbar: {
                icon: 'globe',
                items: [
                    { value: 'nb', title: 'Bokmål' },
                    { value: 'nn', title: 'Nynorsk' },
                ],
            },
        },
    },
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
