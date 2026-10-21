import { getCommonEnv, getRequiredEnv, getUngBrukerdialogApiBrowserEnv } from '@sif/env';

import { AppEnv } from '../../env.schema.ts';

export const getAppEnv = (): AppEnv => ({
    ...getCommonEnv(),
    ...getUngBrukerdialogApiBrowserEnv(),
    SIF_PUBLIC_URL_AKTIVITETSPENGER: getRequiredEnv('SIF_PUBLIC_URL_AKTIVITETSPENGER'),
    SIF_PUBLIC_URL_SAKSBEHANDLINGSTIDER: getRequiredEnv('SIF_PUBLIC_URL_SAKSBEHANDLINGSTIDER'),
    SIF_PUBLIC_APP_LANSERINGSDATO: getRequiredEnv('SIF_PUBLIC_APP_LANSERINGSDATO'),
});
