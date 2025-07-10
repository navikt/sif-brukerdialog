import { client } from '@navikt/k9-brukerdialog-prosessering-api/src/generated/omsorgspenger/client.gen';
import { getCommonEnv, getRequiredEnv } from '@navikt/sif-common-env';
import { initK9BrukerdialogProsesseringApiClient, initK9SakInnsynApiClient } from '@navikt/sif-common-query';
import { initApiClient } from '@navikt/sif-common-query/src/api-clients/initApiClient';

export const initSøknadApiClients = () => {
    initApiClient(
        client,
        getRequiredEnv('K9_BRUKERDIALOG_PROSESSERING_FRONTEND_PATH'),
        getCommonEnv().SIF_PUBLIC_LOGIN_URL,
    );
    initK9BrukerdialogProsesseringApiClient();
    initK9SakInnsynApiClient();
};
