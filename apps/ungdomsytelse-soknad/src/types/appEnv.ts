import { getCommonEnv, getRequiredEnv } from '@navikt/sif-common-env';

const getAppEnv = () => ({
    ...getCommonEnv(),
    UNG_DELTAKELSE_OPPLYSER_FRONTEND_PATH: getRequiredEnv('UNG_DELTAKELSE_OPPLYSER_FRONTEND_PATH'),
});

export const appEnv = getAppEnv();
