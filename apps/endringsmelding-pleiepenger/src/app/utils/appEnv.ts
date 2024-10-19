import { commonEnv, getEnv, getRequiredEnv } from '@navikt/sif-common-env';

const getAppEnv = () => ({
    ...commonEnv,
    INNSYN_URL: getRequiredEnv('INNSYN_URL'),
    DOMAIN_URL: getEnv('DOMAIN_URL'),
});

export const appEnv = getAppEnv();
