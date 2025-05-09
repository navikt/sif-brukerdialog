import { Preview } from '@storybook/react';
import '@navikt/ds-css';

// Add a <script> element with JSON content to the document head
if (typeof window !== 'undefined') {
    const scriptElement = document.createElement('script');
    scriptElement.type = 'application/json';
    scriptElement.id = 'nav:appSettings';
    scriptElement.textContent = JSON.stringify({
        ENV: 'dev',
        APP_VERSION: 'dev',
        PUBLIC_PATH: '/familie/sykdom-i-familien/soknad/pleiepenger',
        GITHUB_REF_NAME: 'psb-frilans',
        SIF_PUBLIC_AMPLITUDE_API_KEY: 'default',
        SIF_PUBLIC_APPSTATUS_DATASET: 'staging',
        SIF_PUBLIC_APPSTATUS_PROJECT_ID: 'ryujtq87',
        SIF_PUBLIC_DEKORATOR_URL:
            'https://dekoratoren.ekstern.dev.nav.no/?simple=true&chatbot=false&urlLookupTable=false&logoutUrl=https://pleiepengesoknad.intern.dev.nav.no/oauth2/logout',
        SIF_PUBLIC_LOGIN_URL:
            'https://pleiepengesoknad.intern.dev.nav.no/oauth2/login?redirect=/familie/sykdom-i-familien/soknad/pleiepenger/soknad',
        SIF_PUBLIC_MINSIDE_URL: 'https://www.intern.dev.nav.no/minside',
        SIF_PUBLIC_USE_AMPLITUDE: 'true',
        K9_BRUKERDIALOG_PROSESSERING_FRONTEND_PATH: '/familie/sykdom-i-familien/soknad/pleiepenger/api/k9-brukerdialog',
        K9_BRUKERDIALOG_PROSESSERING_API_SCOPE: 'dev-gcp:dusseldorf:k9-brukerdialog-prosessering',
        K9_BRUKERDIALOG_PROSESSERING_API_URL: 'http://k9-brukerdialog-prosessering',
        SIF_PUBLIC_INNSYN_URL: 'https://sif-innsyn.intern.dev.nav.no/familie/sykdom-i-familien/soknad/innsyn/',
    });
    document.head.appendChild(scriptElement);
}
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
