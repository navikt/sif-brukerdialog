import { getCommonEnv, getK9SakInnsynEnv, getMaybeEnv } from '@navikt/sif-common-env';

import { AppEnv } from '../../../env.schema';

export const getAppEnv = (): AppEnv => ({
    SIF_PUBLIC_FEATURE_TOGGLE_FRAVÆR_FRA_ARBEID: getMaybeEnv('SIF_PUBLIC_FEATURE_TOGGLE_FRAVÆR_FRA_ARBEID') || 'off',
    ...getCommonEnv(),
    ...getK9SakInnsynEnv(),
});

export const appEnv = getAppEnv();
