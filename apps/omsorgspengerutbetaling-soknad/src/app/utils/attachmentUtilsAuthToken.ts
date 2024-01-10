import { getEnvironmentVariable } from '@navikt/sif-common-core-ds/src/utils/envUtils';

export const getAttachmentURLFrontend = (url: string): string => {
    return url.replace(getEnvironmentVariable('VEDLEGG_API_URL'), getEnvironmentVariable('FRONTEND_VEDLEGG_URL'));
};

export const getAttachmentURLBackend = (url?: string): string => {
    if (url !== undefined) {
        return url.replace(getEnvironmentVariable('FRONTEND_VEDLEGG_URL'), getEnvironmentVariable('VEDLEGG_API_URL'));
    }
    return '';
};
