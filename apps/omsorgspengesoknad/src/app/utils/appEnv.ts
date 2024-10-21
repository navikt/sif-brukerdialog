import { getCommonEnv, getRequiredEnv } from '@navikt/sif-common-env';

export const getAppEnv = () => ({
    ...getCommonEnv(),
    SIF_PUBLIC_FEATURE_NYNORSK: getRequiredEnv('SIF_PUBLIC_FEATURE_NYNORSK'),
});

export const appEnv = getAppEnv();
