import { Attachment } from '@navikt/sif-common-core-ds/src/types/Attachment';
import { attachmentHasBeenUploaded } from '@navikt/sif-common-core-ds/src/utils/attachmentUtils';

export const getUploadedAttachments = (attachments: Attachment[]): Attachment[] =>
    attachments.filter((attachment) => attachmentHasBeenUploaded(attachment));
