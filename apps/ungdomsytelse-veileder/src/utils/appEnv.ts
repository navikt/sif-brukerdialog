import { getBaseEnv, getMaybeEnv, getUngDeltakelseOpplyserBrowserEnv } from '@navikt/sif-common-env';
import { AppEnv } from '../../env.schema';

export const getAppEnv = (): AppEnv => ({
    ...getBaseEnv(),
    ...getUngDeltakelseOpplyserBrowserEnv(),
    isLocal: getMaybeEnv('IS_LOCAL') === 'true' ? true : false,
});

export const appEnv = getAppEnv();
