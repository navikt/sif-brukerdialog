import { Attachment } from '@navikt/sif-common-core-ds/src/types/Attachment';
import {
    attachmentHasBeenUploaded,
    getTotalSizeOfAttachments,
    MAX_TOTAL_ATTACHMENT_SIZE_BYTES,
} from '@navikt/sif-common-core-ds/src/utils/attachmentUtils';
import { ValidationResult } from '@navikt/sif-common-formik-ds/src';

export enum ValidateAttachmentsErrors {
    'samletStørrelseForHøy' = 'samletStørrelseForHøy',
    'forMangeFiler' = 'forMangeFiler',
}

export const validateAttachments = (attachments: Attachment[]): ValidationResult<ValidateAttachmentsErrors> => {
    const uploadedAttachments = attachments.filter((attachment) => attachmentHasBeenUploaded(attachment));
    const totalSizeInBytes: number = getTotalSizeOfAttachments(uploadedAttachments);
    if (totalSizeInBytes > MAX_TOTAL_ATTACHMENT_SIZE_BYTES) {
        return ValidateAttachmentsErrors.samletStørrelseForHøy;
    }
    if (uploadedAttachments.length > 100) {
        return ValidateAttachmentsErrors.forMangeFiler;
    }
    return undefined;
};
