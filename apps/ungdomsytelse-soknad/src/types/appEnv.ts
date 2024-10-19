import { commonEnv, getRequiredEnv } from '@navikt/sif-common-env';

const getAppEnv = () => ({
    ...commonEnv,
    UNG_DELTAKELSE_OPPLYSER_FRONTEND_PATH: getRequiredEnv('UNG_DELTAKELSE_OPPLYSER_FRONTEND_PATH'),
});

export const appEnv = getAppEnv();
