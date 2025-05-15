import { getBaseEnv, getMaybeBoolEnv, getUngDeltakelseOpplyserBrowserEnv } from '@navikt/sif-common-env';
import { AppEnv } from '../../env.schema';

export const getAppEnv = (): AppEnv => ({
    ...getBaseEnv(),
    ...getUngDeltakelseOpplyserBrowserEnv(),
    SIF_PUBLIC_IS_LOCAL: getMaybeBoolEnv('SIF_PUBLIC_IS_LOCAL'),
});

export const appEnv = getAppEnv();
