import { getCommonEnv, getRequiredEnv } from '@navikt/sif-common-env';

export const getAppEnv = () => ({
    ...getCommonEnv(),
    INNSYN_PP: getRequiredEnv('INNSYN_PP'),
    PLEIEPENGER_SYKT_BARN_URL: getRequiredEnv('PLEIEPENGER_SYKT_BARN_URL'),
    ENDRINGSMELDING_PP: getRequiredEnv('ENDRINGSMELDING_PP'),
    SIF_PUBLIC_FEATURE_OPPLARINGSPENGER_VELG_BARN:
        getRequiredEnv('SIF_PUBLIC_FEATURE_OPPLARINGSPENGER_VELG_BARN') === 'on' ? 'on' : 'off',
    SIF_PUBLIC_FEATURE_OPPLARINGSPENGER_VELG_DOKUMENTTYPE:
        getRequiredEnv('SIF_PUBLIC_FEATURE_OPPLARINGSPENGER_VELG_DOKUMENTTYPE') === 'on' ? 'on' : 'off',
});

export const appEnv = getAppEnv();
