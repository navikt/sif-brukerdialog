import { getCommonEnv, getRequiredEnv } from '@sif/env';

import { AppEnv } from '../../../env.schema';

export const normalizePublicPath = (publicPath: string): string => `${publicPath.replace(/\/$/, '')}/`;

export const getAppEnv = (): AppEnv => {
    const commonEnv = getCommonEnv();

    return {
        ...commonEnv,
        PUBLIC_PATH: normalizePublicPath(commonEnv.PUBLIC_PATH),
        SIF_PUBLIC_OMS_IKKE_TILSYN_URL: getRequiredEnv('SIF_PUBLIC_OMS_IKKE_TILSYN_URL'),
    };
};
