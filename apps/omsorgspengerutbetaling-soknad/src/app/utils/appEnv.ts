import { commonEnv, getRequiredEnv } from '@navikt/sif-common-env';

export const getAppEnv = () => ({
    ...commonEnv,
    SIF_PUBLIC_SKIP_ORGNUM_VALIDATION: getRequiredEnv('SIF_PUBLIC_SKIP_ORGNUM_VALIDATION'),
});

export const appEnv = getAppEnv();
