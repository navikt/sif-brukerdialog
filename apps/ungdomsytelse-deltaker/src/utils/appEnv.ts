import { getCommonEnv, getMaybeEnv, getRequiredEnv, getUngDeltakelseOpplyserBrowserEnv } from '@navikt/sif-common-env';
import { AppEnv, AppEnvKey } from '../../env.schema';

export const getAppEnv = (): AppEnv => ({
    ...getCommonEnv(),
    ...getUngDeltakelseOpplyserBrowserEnv(),
    [AppEnvKey.SIF_PUBLIC_PERSONALIA_URL]: getRequiredEnv(AppEnvKey.SIF_PUBLIC_PERSONALIA_URL),
    [AppEnvKey.VELG_SCENARIO]: getMaybeEnv(AppEnvKey.VELG_SCENARIO),
});

export const appEnv = getAppEnv();
