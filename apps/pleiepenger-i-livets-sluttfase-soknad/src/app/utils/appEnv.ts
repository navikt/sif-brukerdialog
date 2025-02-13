import { getCommonEnv, getMaybeEnv } from '@navikt/sif-common-env';
import { AppEnv } from '../../../env.schema';

const getAppEnv = (): AppEnv => ({
    ...getCommonEnv(),
    SIF_PUBLIC_FEATURE_NYNORSK: getMaybeEnv('SIF_PUBLIC_FEATURE_NYNORSK') === 'on' ? 'on' : 'off',
    SIF_PUBLIC_FEATURE_SOKE_ETT_AAR_TILBAKE:
        getMaybeEnv('SIF_PUBLIC_FEATURE_SOKE_ETT_AAR_TILBAKE') === 'on' ? 'on' : 'off',
});

export const appEnv = getAppEnv();
