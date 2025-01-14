import { getCommonEnv, getRequiredEnv } from '@navikt/sif-common-env';

const getAppEnv = () => ({
    ...getCommonEnv(),
    SIF_PUBLIC_FEATURE_NYNORSK: getRequiredEnv('SIF_PUBLIC_FEATURE_NYNORSK') === 'on' ? 'on' : 'off',
});

export const appEnv = getAppEnv();
