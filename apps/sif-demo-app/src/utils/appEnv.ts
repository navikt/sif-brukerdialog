import { getCommonEnv, getK9SakInnsynEnv, getUngDeltakelseOpplyserBrowserEnv } from '@navikt/sif-common-env';
import { AppEnv } from '../../env.schema';

export const getAppEnv = (): AppEnv => ({
    ...getCommonEnv(),
    ...getK9SakInnsynEnv(),
    ...getUngDeltakelseOpplyserBrowserEnv(),
});

export const appEnv = getAppEnv();
