import { getCommonEnv, getK9SakInnsynEnv, getRequiredEnv } from '@navikt/sif-common-env';
import { AppEnv } from '../../../env.schema';

export const getAppEnv = (): AppEnv => ({
    ...getCommonEnv(),
    ...getK9SakInnsynEnv(),
    INJECT_DECORATOR: getRequiredEnv('INJECT_DECORATOR') === 'true' ? 'true' : 'false',
    SIF_PUBLIC_FEATURE_NYNORSK: getRequiredEnv('SIF_PUBLIC_FEATURE_NYNORSK') === 'on' ? 'on' : 'off',
});

export const appEnv = getAppEnv();
