import { getCommonEnv, getK9SakInnsynEnv, getMaybeEnv } from '@navikt/sif-common-env';

import { AppEnv, AppEnvKey } from '../../../../env.schema';

export const getAppEnv = (): AppEnv => ({
    ...getCommonEnv(),
    ...getK9SakInnsynEnv(),
    [AppEnvKey.VELG_SCENARIO]: getMaybeEnv(AppEnvKey.VELG_SCENARIO),
});
