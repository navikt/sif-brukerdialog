import { getCommonEnv, getK9SakInnsynEnv } from '@sif/env';

import { AppEnv } from '../../../../env.schema';

export const getAppEnv = (): AppEnv => ({
    ...getCommonEnv(),
    ...getK9SakInnsynEnv(),
});

export const appEnv = getAppEnv();
