import { commonEnv, getRequiredEnv } from '@navikt/sif-common-env';

const getAppEnv = () => ({
    ...commonEnv,
    OMS_IKKE_TILSYN_URL: getRequiredEnv('OMS_IKKE_TILSYN_URL'),
});

export const appEnv = getAppEnv();
