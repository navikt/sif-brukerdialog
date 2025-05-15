import { getBaseEnv, getMaybeEnv, getUngDeltakelseOpplyserBrowserEnv } from '@navikt/sif-common-env';
import { AppEnv } from '../../env.schema';

export const getAppEnv = (): AppEnv => ({
    ...getBaseEnv(),
    ...getUngDeltakelseOpplyserBrowserEnv(),
    SIF_PUBLIC_IS_LOCAL: getMaybeEnv('SIF_PUBLIC_IS_LOCAL') === 'true' ? true : false,
});

export const appEnv = getAppEnv();
