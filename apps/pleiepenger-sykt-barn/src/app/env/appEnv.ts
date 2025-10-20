import { getCommonEnv, getRequiredEnv } from '@navikt/sif-common-env';

import { AppEnv } from '../../../env.schema';

const getAppEnv = (): AppEnv => ({
    ...getCommonEnv(),
    SIF_PUBLIC_INNSYN_URL: getRequiredEnv('SIF_PUBLIC_INNSYN_URL'),
    SIF_PUBLIC_FEATURE_VIS_SPM_SLUTTET_I_PERIODE:
        getRequiredEnv('SIF_PUBLIC_FEATURE_VIS_SPM_SLUTTET_I_PERIODE') === 'on' ? 'on' : 'off',
    SIF_PUBLIC_FEATURE_NORMALARBEIDST_IKKE_FRILANSER:
        getRequiredEnv('SIF_PUBLIC_FEATURE_NORMALARBEIDST_IKKE_FRILANSER') === 'on' ? 'on' : 'off',
});

export const appEnv = getAppEnv();
