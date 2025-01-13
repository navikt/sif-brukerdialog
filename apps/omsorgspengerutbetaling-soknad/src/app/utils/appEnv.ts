import { getCommonEnv, getMaybeEnv } from '@navikt/sif-common-env';

const getAppEnv = () => ({
    ...getCommonEnv(),
    SIF_PUBLIC_FEATURE_NYNORSK: getMaybeEnv('SIF_PUBLIC_FEATURE_NYNORSK') === 'on' ? 'on' : 'off',
});

export const appEnv = getAppEnv();
