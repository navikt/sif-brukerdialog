import { getCommonEnv, getMaybeEnv, getUngDeltakelseOpplyserBrowserEnv } from '@navikt/sif-common-env';

import { AppEnv, AppEnvKey } from '../../../../env.schema';

export const getAppEnv = (): AppEnv => ({
    ...getCommonEnv(),
    ...getUngDeltakelseOpplyserBrowserEnv(),

    [AppEnvKey.SIF_PUBLIC_USE_FARO]: getMaybeEnv(AppEnvKey.SIF_PUBLIC_USE_FARO),
    [AppEnvKey.SIF_PUBLIC_NAIS_FRONTEND_TELEMETRY_COLLECTOR_URL]: getMaybeEnv(
        AppEnvKey.SIF_PUBLIC_NAIS_FRONTEND_TELEMETRY_COLLECTOR_URL,
    ),
});
