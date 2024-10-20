import { commonEnv, getSifInnsynBrowserEnv } from '@navikt/sif-common-env';
import { AppEnv } from '../../../env.schema';

const getAppEnv = (): AppEnv => ({
    ...commonEnv,
    ...getSifInnsynBrowserEnv(),
});

export const appEnv = getAppEnv();
