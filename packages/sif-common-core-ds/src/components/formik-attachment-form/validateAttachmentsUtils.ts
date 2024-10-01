import { Attachment } from '@navikt/sif-common-core-ds/src/types/Attachment';
import {
    attachmentHasBeenUploaded,
    getTotalSizeOfAttachments,
    MAX_TOTAL_ATTACHMENT_SIZE_BYTES,
} from '@navikt/sif-common-core-ds/src/utils/attachmentUtils';
import { ValidationResult } from '@navikt/sif-common-formik-ds';

export enum ValidateAttachmentsErrors {
    'forMangeFiler' = 'forMangeFiler',
    'ingenFiler' = 'ingenFiler',
    'samletStørrelseForHøy' = 'samletStørrelseForHøy',
}

export const validateAttachments = (
    attachments: Attachment[],
    required?: boolean,
): ValidationResult<ValidateAttachmentsErrors> => {
    const uploadedAttachments = attachments.filter((attachment) => attachmentHasBeenUploaded(attachment));
    const totalSizeInBytes: number = getTotalSizeOfAttachments(uploadedAttachments);
    if (totalSizeInBytes > MAX_TOTAL_ATTACHMENT_SIZE_BYTES) {
        return ValidateAttachmentsErrors.samletStørrelseForHøy;
    }
    if (uploadedAttachments.length > 100) {
        return ValidateAttachmentsErrors.forMangeFiler;
    }
    if (required && uploadedAttachments.length === 0) {
        return ValidateAttachmentsErrors.ingenFiler;
    }
    return undefined;
};
