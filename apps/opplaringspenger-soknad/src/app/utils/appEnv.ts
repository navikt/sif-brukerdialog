import { getCommonEnv, getK9SakInnsynEnv, getMaybeEnv } from '@navikt/sif-common-env';
import { AppEnv } from '../../../env.schema';

export const getAppEnv = (): AppEnv => ({
    ...getCommonEnv(),
    ...getK9SakInnsynEnv(),
    SIF_PUBLIC_FEATURE_NYNORSK: getMaybeEnv('SIF_PUBLIC_FEATURE_NYNORSK') === 'on' ? 'on' : 'off',
});

export const appEnv = getAppEnv();
