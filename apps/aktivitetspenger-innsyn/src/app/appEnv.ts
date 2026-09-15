import {
    getCommonEnv,
    getRequiredEnv,
    getUngBrukerdialogApiBrowserEnv,
    getUngDeltakelseOpplyserBrowserEnv,
} from '@navikt/sif-common-env';

import { AppEnv } from '../../env.schema';

export const getAppEnv = (): AppEnv => ({
    ...getCommonEnv(),
    ...getUngDeltakelseOpplyserBrowserEnv(),
    ...getUngBrukerdialogApiBrowserEnv(),
    SIF_PUBLIC_URL_AKTIVITETSPENGER: getRequiredEnv('SIF_PUBLIC_URL_AKTIVITETSPENGER'),
    SIF_PUBLIC_URL_SAKSBEHANDLINGSTIDER: getRequiredEnv('SIF_PUBLIC_URL_SAKSBEHANDLINGSTIDER'),
});
