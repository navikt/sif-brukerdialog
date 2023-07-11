import { Attachment } from '@navikt/sif-common-core-ds/lib/types/Attachment';
import { attachmentHasBeenUploaded } from '@navikt/sif-common-core-ds/lib/utils/attachmentUtils';

export const getUploadedAttachments = (attachments: Attachment[]): Attachment[] =>
    attachments.filter((attachment) => attachmentHasBeenUploaded(attachment));
