// import { client } from '@navikt/k9-brukerdialog-prosessering-api';
import { getCommonEnv, getRequiredEnv } from '@navikt/sif-common-env';
import { initApiClient } from '@navikt/sif-common-query/src/api-clients/initApiClient';
import { client } from '../gen-client/client.gen';

export const initK9BrukerdialogProsesseringApiClient = () =>
    initApiClient(
        client,
        getRequiredEnv('K9_BRUKERDIALOG_PROSESSERING_FRONTEND_PATH'),
        getCommonEnv().SIF_PUBLIC_LOGIN_URL,
    );
