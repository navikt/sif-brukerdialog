import { getCommonEnv, getRequiredEnv } from '@navikt/sif-common-env';

const getAppEnv = () => ({
    ...getCommonEnv(),
    OMS_IKKE_TILSYN_URL: getRequiredEnv('OMS_IKKE_TILSYN_URL'),
});

export const appEnv = getAppEnv();
