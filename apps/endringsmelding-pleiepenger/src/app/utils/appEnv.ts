import { commonEnv, getEnv, getRequiredEnv } from '@navikt/sif-common-env';

const getAppEnv = () => ({
    ...commonEnv,
    INNSYN_URL: getRequiredEnv('SIF_PUBLIC_INNSYN_URL'),
    DOMAIN_URL: getEnv('DOMAIN_URL'),
});

export const appEnv = getAppEnv();
