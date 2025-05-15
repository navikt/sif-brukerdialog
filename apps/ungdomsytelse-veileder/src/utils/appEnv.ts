import { getBaseEnv, getMaybeBoolEnv, getUngDeltakelseOpplyserBrowserEnv } from '@navikt/sif-common-env';
import { AppEnv } from '../../env.schema';

export const getAppEnv = (): AppEnv => ({
    ...getBaseEnv(),
    ...getUngDeltakelseOpplyserBrowserEnv(),
    SIF_PUBLIC_USE_MSW: getMaybeBoolEnv('SIF_PUBLIC_USE_MSW'),
});

export const appEnv = getAppEnv();
