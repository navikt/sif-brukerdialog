import { client as prosesseringClient } from '@navikt/k9-brukerdialog-prosessering-api/src/generated/omsorgspenger/client.gen';
import { client as innsynClient } from '@navikt/k9-sak-innsyn-api/src/generated/innsyn/client.gen';
import { getCommonEnv, getRequiredEnv } from '@navikt/sif-common-env';
import { initApiClient } from '@navikt/sif-common-query/src/api-clients/initApiClient';

export const initSøknadApiClients = () => {
    initApiClient(
        prosesseringClient,
        getRequiredEnv('K9_BRUKERDIALOG_PROSESSERING_FRONTEND_PATH'),
        getCommonEnv().SIF_PUBLIC_LOGIN_URL,
    );
    initApiClient(innsynClient, getRequiredEnv('K9_SAK_INNSYN_FRONTEND_PATH'), getCommonEnv().SIF_PUBLIC_LOGIN_URL);
};
