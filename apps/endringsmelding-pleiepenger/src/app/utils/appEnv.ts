import { getCommonEnv, getRequiredEnv, getSifInnsynBrowserEnv } from '@navikt/sif-common-env';
import { AppEnv } from '../../../env.schema';

const getAppEnv = (): AppEnv => ({
    ...getCommonEnv(),
    ...getSifInnsynBrowserEnv(),
    SIF_PUBLIC_INNSYN_URL: getRequiredEnv('SIF_PUBLIC_INNSYN_URL'),
    SIF_PUBLIC_DOMAIN_URL: getRequiredEnv('SIF_PUBLIC_DOMAIN_URL'),
});

export const appEnv = getAppEnv();
