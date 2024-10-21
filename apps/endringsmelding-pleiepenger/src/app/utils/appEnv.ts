import { getCommonEnv, getEnv, getRequiredEnv } from '@navikt/sif-common-env';

const getAppEnv = () => ({
    ...getCommonEnv(),
    INNSYN_URL: getRequiredEnv('SIF_PUBLIC_INNSYN_URL'),
    DOMAIN_URL: getEnv('DOMAIN_URL'),
});

export const appEnv = getAppEnv();
