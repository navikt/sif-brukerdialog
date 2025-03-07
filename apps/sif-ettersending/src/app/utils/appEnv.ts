import { getCommonEnv, getRequiredEnv } from '@navikt/sif-common-env';

export const getAppEnv = () => ({
    ...getCommonEnv(),
    INNSYN_PP: getRequiredEnv('INNSYN_PP'),
    PLEIEPENGER_SYKT_BARN_URL: getRequiredEnv('PLEIEPENGER_SYKT_BARN_URL'),
    ENDRINGSMELDING_PP: getRequiredEnv('ENDRINGSMELDING_PP'),
    SIF_PUBLIC_FEATURE_NYNORSK: getRequiredEnv('SIF_PUBLIC_FEATURE_NYNORSK') === 'on' ? 'on' : 'off',
    SIF_PUBLIC_FEATURE_OPPLARINGSPENGER: getRequiredEnv('SIF_PUBLIC_FEATURE_OPPLARINGSPENGER') === 'on' ? 'on' : 'off',
});

export const appEnv = getAppEnv();
