import {
    getCommonEnv,
    getRequiredEnv,
    getUngBrukerdialogApiBrowserEnv,
    getUngDeltakelseOpplyserBrowserEnv,
} from '@navikt/sif-common-env';

import { AppEnv } from '../../../env.schema';

export const getAppEnv = (): AppEnv => ({
    ...getCommonEnv(),
    ...getUngBrukerdialogApiBrowserEnv(),
    ...getUngDeltakelseOpplyserBrowserEnv(),
    SIF_PUBLIC_AKTIVITETSPENGER_INNSYN_URL: getRequiredEnv('SIF_PUBLIC_AKTIVITETSPENGER_INNSYN_URL'),
});
