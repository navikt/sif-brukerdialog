import { getCommonEnv, getK9SakInnsynEnv, getMaybeEnv } from '@navikt/sif-common-env';
import { AppEnv } from '../../../env.schema';

export const getAppEnv = (): AppEnv => ({
    ...getCommonEnv(),
    ...getK9SakInnsynEnv(),
    INJECT_DECORATOR: getMaybeEnv('INJECT_DECORATOR') === 'true' ? 'true' : 'false',
    SIF_PUBLIC_FEATURE_NYNORSK: getMaybeEnv('SIF_PUBLIC_FEATURE_NYNORSK') === 'on' ? 'on' : 'off',
});

export const appEnv = getAppEnv();
