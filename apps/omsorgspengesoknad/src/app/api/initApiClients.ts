import { omsorgspenger } from '@navikt/k9-brukerdialog-prosessering-api';
import { innsyn } from '@navikt/k9-sak-innsyn-api';
import { getCommonEnv, getRequiredEnv } from '@navikt/sif-common-env';
import { initApiClient } from '@navikt/sif-common-query/src/api-clients/initApiClient';

export const initSøknadApiClients = () => {
    initApiClient(
        omsorgspenger.client,
        getRequiredEnv('K9_BRUKERDIALOG_PROSESSERING_FRONTEND_PATH'),
        getCommonEnv().SIF_PUBLIC_LOGIN_URL,
    );
    initApiClient(innsyn.client, getRequiredEnv('K9_SAK_INNSYN_FRONTEND_PATH'), getCommonEnv().SIF_PUBLIC_LOGIN_URL);
};
