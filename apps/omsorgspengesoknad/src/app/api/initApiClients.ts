import { initK9BrukerdialogProsesseringApiClients } from '@navikt/k9-brukerdialog-prosessering-api';
import { initK9SakInnsynApiClients } from '@navikt/k9-sak-innsyn-api';
import { getCommonEnv, getRequiredEnv } from '@navikt/sif-common-env';
import { initSifComonQueryClients } from '@navikt/sif-common-query';

export const initApiClients = () => {
    const innsynFrontendPath = getRequiredEnv('K9_SAK_INNSYN_FRONTEND_PATH');
    const brukerdialogFrontendPath = getRequiredEnv('K9_BRUKERDIALOG_PROSESSERING_FRONTEND_PATH');
    const sifPublicLoginUrl = getCommonEnv().SIF_PUBLIC_LOGIN_URL;

    initK9SakInnsynApiClients(innsynFrontendPath, sifPublicLoginUrl);
    initK9BrukerdialogProsesseringApiClients(brukerdialogFrontendPath, sifPublicLoginUrl);
    initSifComonQueryClients(brukerdialogFrontendPath, sifPublicLoginUrl);
};
