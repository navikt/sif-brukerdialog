import { commonEnv } from '@navikt/sif-common-env';

const getAppEnv = () => ({
    ...commonEnv,
});

export const appEnv = getAppEnv();
