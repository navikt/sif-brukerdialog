import { getCommonEnv, getMaybeEnv, getRequiredEnv, getUngDeltakelseOpplyserBrowserEnv } from '@navikt/sif-common-env';
import { AppEnv, AppEnvKey } from '../../env.schema';

export const getAppEnv = (): AppEnv => ({
    ...getCommonEnv(),
    ...getUngDeltakelseOpplyserBrowserEnv(),
    [AppEnvKey.SIF_PUBLIC_PERSONALIA_URL]: getRequiredEnv(AppEnvKey.SIF_PUBLIC_PERSONALIA_URL),
    [AppEnvKey.VELG_SCENARIO]: getMaybeEnv(AppEnvKey.VELG_SCENARIO),
    [AppEnvKey.SIF_PUBLIC_URL_OM_UNGDOMSPROGRAMYTELSEN]: getRequiredEnv(
        AppEnvKey.SIF_PUBLIC_URL_OM_UNGDOMSPROGRAMYTELSEN,
    ),
    [AppEnvKey.SIF_PUBLIC_URL_PERSONOPPLYSNINGER]: getRequiredEnv(AppEnvKey.SIF_PUBLIC_URL_PERSONOPPLYSNINGER),
    [AppEnvKey.SIF_PUBLIC_URL_PERSONVERN]: getRequiredEnv(AppEnvKey.SIF_PUBLIC_URL_PERSONVERN),
    [AppEnvKey.SIF_PUBLIC_URL_RETT_OG_PLIKT]: getRequiredEnv(AppEnvKey.SIF_PUBLIC_URL_RETT_OG_PLIKT),
});

export const appEnv = getAppEnv();
