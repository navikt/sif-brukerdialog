import {
    getCommonEnv,
    getMaybeEnv,
    getUngBrukerdialogApiBrowserEnv,
    getUngDeltakelseOpplyserBrowserEnv,
} from '@navikt/sif-common-env';

import { AppEnv, AppEnvKey } from '../../env.schema';

export const getAppEnv = (): AppEnv => ({
    ...getCommonEnv(),
    ...getUngDeltakelseOpplyserBrowserEnv(),
    ...getUngBrukerdialogApiBrowserEnv(),

});
