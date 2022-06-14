import { Attachment } from '@navikt/sif-common-core/lib/types/Attachment';
import {
    attachmentHasBeenUploaded,
    getTotalSizeOfAttachments,
    MAX_TOTAL_ATTACHMENT_SIZE_BYTES,
} from '@navikt/sif-common-core/lib/utils/attachmentUtils';
import intlHelper from '@navikt/sif-common-core/lib/utils/intlUtils';
import { ValidationResult } from '@navikt/sif-common-formik/lib/validation/types';
import { IntlShape } from 'react-intl';
import { SoknadFormField } from '../types/SoknadFormData';
import appSentryLogger from '../utils/appSentryLogger';

export const reportUnhandledValidationError = (error: any, field: SoknadFormField): void => {
    appSentryLogger.logError('unhandledValidationError', JSON.stringify({ field, error }));
};

export const getUnhandledValidationMessage = (intl: IntlShape, error: any) =>
    intlHelper(intl, 'unhandledValidation', { error });

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
