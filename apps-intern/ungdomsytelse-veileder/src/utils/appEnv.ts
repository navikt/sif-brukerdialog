import { getBaseEnv, getMaybeBoolEnv, getMaybeEnv, getUngDeltakelseOpplyserBrowserEnv } from '@navikt/sif-common-env';
import { AppEnv } from '../../env.schema';

export const getAppEnv = (): AppEnv => ({
    ...getBaseEnv(),
    ...getUngDeltakelseOpplyserBrowserEnv(),
    DEV_IS_STORYBOOK: getMaybeBoolEnv('DEV_IS_STORYBOOK'),
    SIF_PUBLIC_FEATURE_ENDRE_SLUTTDATO: getMaybeEnv('SIF_PUBLIC_FEATURE_ENDRE_SLUTTDATO') || 'off',
    SIF_PUBLIC_FEATURE_SJEKKLISTE: getMaybeEnv('SIF_PUBLIC_FEATURE_SJEKKLISTE') || 'off',
    SIF_PUBLIC_UMAMI_NETTSIDE_ID: getMaybeEnv('SIF_PUBLIC_UMAMI_NETTSIDE_ID'),
    SIF_PUBLIC_USE_FARO: getMaybeBoolEnv('SIF_PUBLIC_USE_FARO'),
    SIF_PUBLIC_NAIS_FRONTEND_TELEMETRY_COLLECTOR_URL: getMaybeEnv('SIF_PUBLIC_NAIS_FRONTEND_TELEMETRY_COLLECTOR_URL'),
});

export const appEnv = getAppEnv();
