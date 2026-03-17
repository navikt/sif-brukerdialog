import { initK9BrukerdialogProsesseringApiClients } from '@navikt/k9-brukerdialog-prosessering-api';

/**
 * Oppretter API-klienter for alle API-er som brukes i appen.
 * Dette må gjøres før noen av API-klientene brukes.
 */

export const initApiClients = () => {
    initK9BrukerdialogProsesseringApiClients({
        frontendPath: '/sif-demo/api',
        loginURL: '#',
    });
};
