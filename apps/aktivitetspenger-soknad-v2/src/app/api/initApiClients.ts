import { initK9BrukerdialogProsesseringApiClients } from '@navikt/k9-brukerdialog-prosessering-api';

export const initApiClients = () => {
    initK9BrukerdialogProsesseringApiClients({
        frontendPath: '/aktivitetspenger-soknad/api',
        loginURL: '#',
    });
};
