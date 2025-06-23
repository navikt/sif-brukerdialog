import { getCommonEnv, getMaybeEnv, getRequiredEnv, getUngDeltakelseOpplyserBrowserEnv } from '@navikt/sif-common-env';
import { AppEnv, AppEnvKey } from '../../env.schema';

export const getAppEnv = (): AppEnv => ({
    ...getCommonEnv(),
    ...getUngDeltakelseOpplyserBrowserEnv(),

    [AppEnvKey.VELG_SCENARIO]: getMaybeEnv(AppEnvKey.VELG_SCENARIO),
    [AppEnvKey.SIF_PUBLIC_USE_FARO]: getMaybeEnv(AppEnvKey.SIF_PUBLIC_USE_FARO),
    [AppEnvKey.SIF_PUBLIC_NAIS_FRONTEND_TELEMETRY_COLLECTOR_URL]: getMaybeEnv(
        AppEnvKey.SIF_PUBLIC_NAIS_FRONTEND_TELEMETRY_COLLECTOR_URL,
    ),

    [AppEnvKey.SIF_PUBLIC_URL_OM_UNGDOMSPROGRAMYTELSEN]: getRequiredEnv(
        AppEnvKey.SIF_PUBLIC_URL_OM_UNGDOMSPROGRAMYTELSEN,
    ),
    [AppEnvKey.SIF_PUBLIC_URL_PERSONOPPLYSNINGER]: getRequiredEnv(AppEnvKey.SIF_PUBLIC_URL_PERSONOPPLYSNINGER),
    [AppEnvKey.SIF_PUBLIC_URL_PERSONVERN]: getRequiredEnv(AppEnvKey.SIF_PUBLIC_URL_PERSONVERN),
    [AppEnvKey.SIF_PUBLIC_URL_RETT_OG_PLIKT]: getRequiredEnv(AppEnvKey.SIF_PUBLIC_URL_RETT_OG_PLIKT),
    [AppEnvKey.SIF_PUBLIC_URL_SKATTEETATEN]: getRequiredEnv(AppEnvKey.SIF_PUBLIC_URL_SKATTEETATEN),
    [AppEnvKey.SIF_PUBLIC_URL_ENDRE_KONTONUMMER]: getRequiredEnv(AppEnvKey.SIF_PUBLIC_URL_ENDRE_KONTONUMMER),
    [AppEnvKey.SIF_PUBLIC_URL_SKRIV_TIL_OSS]: getRequiredEnv(AppEnvKey.SIF_PUBLIC_URL_SKRIV_TIL_OSS),
    [AppEnvKey.SIF_PUBLIC_URL_DOKUMENTARKIV]: getRequiredEnv(AppEnvKey.SIF_PUBLIC_URL_DOKUMENTARKIV),
});
