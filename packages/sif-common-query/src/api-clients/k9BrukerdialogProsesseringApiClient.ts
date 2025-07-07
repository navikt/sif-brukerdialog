import { client } from '@navikt/k9-brukerdialog-prosessering-api';
import { getCommonEnv, getRequiredEnv } from '@navikt/sif-common-env';
import { initApiClient } from './initApiClient';

export const initK9BrukerdialogProsesseringApiClient = () =>
    initApiClient(
        client,
        getRequiredEnv('K9_BRUKERDIALOG_PROSESSERING_FRONTEND_PATH'),
        getCommonEnv().SIF_PUBLIC_LOGIN_URL,
    );
