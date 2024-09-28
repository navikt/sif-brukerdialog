import { getEnvironmentVariable } from '@navikt/sif-common/src/utils/envUtils';

export const getBrowserEnv = () => ({
    PUBLIC_PATH: getEnvironmentVariable('PUBLIC_PATH'),
    APPSTATUS_PROJECT_ID: getEnvironmentVariable('APPSTATUS_PROJECT_ID'),
    APPSTATUS_DATASET: getEnvironmentVariable('APPSTATUS_DATASET'),
});

export const browserEnv = getBrowserEnv();
