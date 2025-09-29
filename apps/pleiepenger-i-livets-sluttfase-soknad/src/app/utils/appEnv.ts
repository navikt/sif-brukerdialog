import { getCommonEnv, getMaybeEnv } from '@navikt/sif-common-env';

import { AppEnv } from '../../../env.schema';

const getAppEnv = (): AppEnv => ({
    ...getCommonEnv(),
    SIF_PUBLIC_FEATURE_SOKE_TIDLIGERE: getMaybeEnv('SIF_PUBLIC_FEATURE_SOKE_TIDLIGERE') === 'on' ? 'on' : 'off',
});

export const appEnv = getAppEnv();
