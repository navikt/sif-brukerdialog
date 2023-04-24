import { Attachment } from '@navikt/sif-common-core-ds/lib/types/Attachment';
import { attachmentHasBeenUploaded } from '@navikt/sif-common-core-ds/lib/utils/attachmentUtils';
import { getEnvironmentVariable } from '@navikt/sif-common-core-ds/lib/utils/envUtils';

export const getAttachmentURLFrontend = (url: string): string => {
    return url.replace(getEnvironmentVariable('VEDLEGG_API_URL'), getEnvironmentVariable('FRONTEND_VEDLEGG_URL'));
};

export const getUploadedAttachments = (attachments: Attachment[]): Attachment[] =>
    attachments.filter((attachment) => attachmentHasBeenUploaded(attachment));
