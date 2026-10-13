import {
    getCommonEnv,
    getUngBrukerdialogApiBrowserEnv,
    getUngDeltakelseOpplyserBrowserEnv,
} from '@sif/env';

import { AppEnv } from '../../env.schema';

export const getAppEnv = (): AppEnv => ({
    ...getCommonEnv(),
    ...getUngDeltakelseOpplyserBrowserEnv(),
    ...getUngBrukerdialogApiBrowserEnv(),
});
