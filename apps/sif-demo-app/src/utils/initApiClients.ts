import { initK9BrukerdialogProsesseringApiClients } from '@navikt/k9-brukerdialog-prosessering-api';

export const initApiClients = () => {
    initK9BrukerdialogProsesseringApiClients({
        frontendPath: '/sif-demo/api',
        loginURL: '/sif-demo/login',
    });
};
