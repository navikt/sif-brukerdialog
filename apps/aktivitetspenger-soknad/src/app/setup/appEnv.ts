import {
    getCommonEnv,
    getUngBrukerdialogApiBrowserEnv,
    getUngDeltakelseOpplyserBrowserEnv,
} from '@navikt/sif-common-env';

import { AppEnv } from '../../../env.schema';

export const getAppEnv = (): AppEnv => ({
    ...getCommonEnv(),
    ...getUngBrukerdialogApiBrowserEnv(),
    ...getUngDeltakelseOpplyserBrowserEnv(),
});
