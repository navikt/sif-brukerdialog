import { getCommonEnv, getRequiredEnv, getUngBrukerdialogApiBrowserEnv } from '@navikt/sif-common-env';

import { AppEnv } from '../../env.schema.ts';

export const getAppEnv = (): AppEnv => ({
    ...getCommonEnv(),
    ...getUngBrukerdialogApiBrowserEnv(),
    SIF_PUBLIC_URL_AKTIVITETSPENGER: getRequiredEnv('SIF_PUBLIC_URL_AKTIVITETSPENGER'),
    SIF_PUBLIC_URL_SAKSBEHANDLINGSTIDER: getRequiredEnv('SIF_PUBLIC_URL_SAKSBEHANDLINGSTIDER'),
    SIF_PUBLIC_IS_OPEN: getRequiredEnv('SIF_PUBLIC_IS_OPEN'),
});
