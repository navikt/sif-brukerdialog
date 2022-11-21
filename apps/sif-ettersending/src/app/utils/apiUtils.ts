import { ApiEndpoint } from '../types/ApiEndpoint';
import { getEnvironmentVariable } from '@navikt/sif-common-core-ds/lib/utils/envUtils';

export const getApiUrl = (resourceType: ApiEndpoint) =>
    `${getEnvironmentVariable('FRONTEND_API_PATH')}/${resourceType}`;
