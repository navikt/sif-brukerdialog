import { initK9BrukerdialogProsesseringApiClients } from '@navikt/k9-brukerdialog-prosessering-api';
import { initK9SakInnsynApiClients } from '@navikt/k9-sak-innsyn-api';
import { getCommonEnv, getRequiredEnv } from '@navikt/sif-common-env';

export const initApiClients = () => {
    initK9SakInnsynApiClients(getRequiredEnv('K9_SAK_INNSYN_FRONTEND_PATH'), getCommonEnv().SIF_PUBLIC_LOGIN_URL);
    initK9BrukerdialogProsesseringApiClients(
        getRequiredEnv('K9_BRUKERDIALOG_PROSESSERING_FRONTEND_PATH'),
        getCommonEnv().SIF_PUBLIC_LOGIN_URL,
    );
};
