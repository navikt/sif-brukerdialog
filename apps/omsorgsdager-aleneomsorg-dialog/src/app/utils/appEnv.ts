import { getCommonEnv, getRequiredEnv } from '@navikt/sif-common-env';
import { AppEnv } from '../../../env.schema';

const getAppEnv = (): AppEnv => ({
    ...getCommonEnv(),
    SIF_PUBLIC_USE_FARO: getRequiredEnv('SIF_PUBLIC_USE_FARO') as 'true' | 'false',
    SIF_PUBLIC_OMS_IKKE_TILSYN_URL: getRequiredEnv('SIF_PUBLIC_OMS_IKKE_TILSYN_URL'),
});

export const appEnv = getAppEnv();
