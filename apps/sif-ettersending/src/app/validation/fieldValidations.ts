import { Attachment } from '@navikt/sif-common-core-ds/src/types/Attachment';
import {
    attachmentHasBeenUploaded,
    getTotalSizeOfAttachments,
    MAX_TOTAL_ATTACHMENT_SIZE_BYTES,
} from '@navikt/sif-common-core-ds/src/utils/attachmentUtils';
import { ValidationError, ValidationResult } from '@navikt/sif-common-formik-ds/lib/validation/types';

export enum AppFieldValidationErrors {
    'ingen_dokumenter' = 'validation.ingen_dokumenter',
    'for_mange_dokumenter' = 'validation.for_mange_dokumenter',
    'samlet_storrelse_for_hoy' = 'validation.samlet_storrelse_for_hoy',
}

export const MAX_BESKRIVELSE_LENGTH = 250;
export const MIN_BESKRIVELSE_LENGTH = 5;

export const validateDocuments = (attachments: Attachment[]): ValidationResult<ValidationError> => {
    const uploadedAttachments = attachments.filter((attachment) => attachmentHasBeenUploaded(attachment));
    const totalSizeInBytes: number = getTotalSizeOfAttachments(attachments);
    if (totalSizeInBytes > MAX_TOTAL_ATTACHMENT_SIZE_BYTES) {
        return { key: AppFieldValidationErrors.samlet_storrelse_for_hoy, keepKeyUnaltered: true };
    }
    if (uploadedAttachments.length === 0) {
        return { key: AppFieldValidationErrors.ingen_dokumenter, keepKeyUnaltered: true };
    }
    if (uploadedAttachments.length > 100) {
        return { key: AppFieldValidationErrors.for_mange_dokumenter, keepKeyUnaltered: true };
    }
    return undefined;
};
