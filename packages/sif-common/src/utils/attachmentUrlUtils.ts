import { Attachment } from '@navikt/sif-common-core-ds/src/types/Attachment';
import { attachmentURLUtils } from '@navikt/sif-common-soknad-ds/src';
import { getEnvironmentVariable } from './envUtils';

export const getAttachmentURLFrontend = (url: string): string => {
    return attachmentURLUtils.getAttachmentFrontendURL(
        url,
        getEnvironmentVariable('K9_BRUKERDIALOG_PROSESSERING_FRONTEND_PATH'),
    );
};

export const getAttachmentURLBackend = (url: string): string => {
    return attachmentURLUtils.getAttachmentBackendURL(
        url,
        getEnvironmentVariable('K9_BRUKERDIALOG_PROSESSERING_API_URL'),
    );
};

export const fixAttachmentURL = (a: Attachment) => {
    return {
        ...a,
        url: a.url
            ? attachmentURLUtils.fixInvalidPathInFrontendURL(
                  a.url,
                  getEnvironmentVariable('K9_BRUKERDIALOG_PROSESSERING_FRONTEND_PATH'),
              )
            : undefined,
    };
};
