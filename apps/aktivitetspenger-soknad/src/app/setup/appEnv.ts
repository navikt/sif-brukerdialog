import {
    getCommonEnv,
    getRequiredEnv,
    getUngBrukerdialogApiBrowserEnv,
    getUngDeltakelseOpplyserBrowserEnv,
} from '@sif/env';

import { AppEnv } from '../../../env.schema.ts';

export const getAppEnv = (): AppEnv => ({
    ...getCommonEnv(),
    ...getUngBrukerdialogApiBrowserEnv(),
    ...getUngDeltakelseOpplyserBrowserEnv(),
    SIF_PUBLIC_AKTIVITETSPENGER_INNSYN_URL: getRequiredEnv('SIF_PUBLIC_AKTIVITETSPENGER_INNSYN_URL'),
    SIF_PUBLIC_SEND_BESKJED: getRequiredEnv('SIF_PUBLIC_SEND_BESKJED'),
    SIF_PUBLIC_APP_LANSERINGSDATO: getRequiredEnv('SIF_PUBLIC_APP_LANSERINGSDATO'),
});
