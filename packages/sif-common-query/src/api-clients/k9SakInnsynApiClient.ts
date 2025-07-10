import { client } from '@navikt/k9-sak-innsyn-k9-sak-api';
import { getCommonEnv, getRequiredEnv } from '@navikt/sif-common-env';
import { initApiClient } from './initApiClient';

export const initK9SakInnsynApiClient = () =>
    initApiClient(client, getRequiredEnv('K9_SAK_INNSYN_FRONTEND_PATH'), getCommonEnv().SIF_PUBLIC_LOGIN_URL);
