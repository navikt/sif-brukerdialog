import {
    getCommonEnv,
    getRequiredEnv,
    getUngBrukerdialogApiBrowserEnv,
    getUngDeltakelseOpplyserBrowserEnv,
} from '@navikt/sif-common-env';

import { AppEnv } from '../../../env.schema.ts';

export const getAppEnv = (): AppEnv => ({
    ...getCommonEnv(),
    ...getUngBrukerdialogApiBrowserEnv(),
    ...getUngDeltakelseOpplyserBrowserEnv(),
    SIF_PUBLIC_AKTIVITETSPENGER_INNSYN_URL: getRequiredEnv('SIF_PUBLIC_AKTIVITETSPENGER_INNSYN_URL'),
    SIF_PUBLIC_SEND_BESKJED: getRequiredEnv('SIF_PUBLIC_SEND_BESKJED'),
});
