import { initK9BrukerdialogProsesseringApiClients } from '@navikt/k9-brukerdialog-prosessering-api';
import { initK9SakInnsynApiClients } from '@navikt/k9-sak-innsyn-api';
import { getCommonEnv, getK9SakInnsynEnv } from '@navikt/sif-common-env';
import { initSifComonQueryClients } from '@navikt/sif-common-query';

/**
 * Initialiserer API-klienter for K9-brukerdialog-prosessering og K9-sak-innsyn.
 * Dette må kalles før noen API-kall gjøres for å sikre at klientene er riktig konfigurert.
 */
export const initApiClients = () => {
    const innsynFrontendPath = getK9SakInnsynEnv().K9_SAK_INNSYN_FRONTEND_PATH;
    const brukerdialogFrontendPath = getCommonEnv().K9_BRUKERDIALOG_PROSESSERING_FRONTEND_PATH;
    const loginURL = getCommonEnv().SIF_PUBLIC_LOGIN_URL;

    initK9SakInnsynApiClients({ frontendPath: innsynFrontendPath, loginURL });
    initK9BrukerdialogProsesseringApiClients({ frontendPath: brukerdialogFrontendPath, loginURL });
    initSifComonQueryClients({ frontendPath: brukerdialogFrontendPath, loginURL });
};
