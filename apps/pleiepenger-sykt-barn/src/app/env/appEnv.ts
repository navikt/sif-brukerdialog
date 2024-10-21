import { getCommonEnv, getRequiredEnv } from '@navikt/sif-common-env';
import { AppEnv } from '../../../env.schema';

const getAppEnv = (): AppEnv => ({
    ...getCommonEnv(),
    SIF_PUBLIC_INNSYN_URL: getRequiredEnv('SIF_PUBLIC_INNSYN_URL'),
});

export const appEnv = getAppEnv();
