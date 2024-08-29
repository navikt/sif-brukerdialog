import { Attachment } from '@navikt/sif-common-core-ds/src/types/Attachment';
import { attachmentHasBeenUploaded } from '@navikt/sif-common-core-ds/src/utils/attachmentUtils';
import { getEnvironmentVariable } from '@navikt/sif-common-core-ds/src/utils/envUtils';
import { attachmentURLUtils } from '@navikt/sif-common-soknad-ds/src';

export const getUploadedAttachments = (attachments: Attachment[]): Attachment[] =>
    attachments.filter((attachment) => attachmentHasBeenUploaded(attachment));

export const getAttachmentURLFrontend = (url: string): string => {
    return attachmentURLUtils.getAttachmentFrontendURL(url, getEnvironmentVariable('FRONTEND_VEDLEGG_URL'));
};

export const getAttachmentURLBackend = (url: string): string => {
    return attachmentURLUtils.getAttachmentBackendURL(url, getEnvironmentVariable('VEDLEGG_API_URL'));
};

export const fixAttachmentURL = (a: Attachment) => {
    return {
        ...a,
        url: a.url
            ? attachmentURLUtils.fixInvalidPathInFrontendURL(a.url, getEnvironmentVariable('FRONTEND_VEDLEGG_URL'))
            : undefined,
    };
};
