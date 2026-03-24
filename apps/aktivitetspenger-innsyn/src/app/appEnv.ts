import {
    getCommonEnv,
    getMaybeEnv,
    getRequiredEnv,
    getUngBrukerdialogApiBrowserEnv,
    getUngDeltakelseOpplyserBrowserEnv,
} from '@navikt/sif-common-env';

import { AppEnv, AppEnvKey } from '../../env.schema';

export const getAppEnv = (): AppEnv => ({
    ...getCommonEnv(),
    ...getUngDeltakelseOpplyserBrowserEnv(),
    ...getUngBrukerdialogApiBrowserEnv(),

    [AppEnvKey.VELG_SCENARIO]: getMaybeEnv(AppEnvKey.VELG_SCENARIO),
    [AppEnvKey.SIF_PUBLIC_USE_FARO]: getMaybeEnv(AppEnvKey.SIF_PUBLIC_USE_FARO),
    [AppEnvKey.SIF_PUBLIC_NAIS_FRONTEND_TELEMETRY_COLLECTOR_URL]: getMaybeEnv(
        AppEnvKey.SIF_PUBLIC_NAIS_FRONTEND_TELEMETRY_COLLECTOR_URL,
    ),
    [AppEnvKey.SIF_PUBLIC_URL_SKATTEETATEN]: getRequiredEnv(AppEnvKey.SIF_PUBLIC_URL_SKATTEETATEN),
});
