import { getCommonEnv } from '@navikt/sif-common-env';

const getAppEnv = () => ({
    ...getCommonEnv(),
});

export const appEnv = getAppEnv();
