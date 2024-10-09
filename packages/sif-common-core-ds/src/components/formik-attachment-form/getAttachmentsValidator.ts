import { ValidationFunction } from '@navikt/sif-common-formik-ds';
import { Attachment } from '../../types';
import {
    attachmentHasBeenUploaded,
    getTotalSizeOfAttachments,
    MAX_TOTAL_ATTACHMENT_SIZE_BYTES,
} from '../../utils/attachmentUtils';

export enum ValidateAttachmentsError {
    noAttachmentsUploaded = 'noAttachmentsUploaded',
    tooManyAttachments = 'tooManyAttachments',
    maxTotalSizeExceeded = 'maxTotalSizeExceeded',
}

export const ValidateAttachmentsErrorKeys = Object.keys(ValidateAttachmentsError);

type AttachmentsValidationResult =
    | undefined
    | ValidateAttachmentsError.tooManyAttachments
    | ValidateAttachmentsError.noAttachmentsUploaded
    | ValidateAttachmentsError.maxTotalSizeExceeded;

export type AttachmentsValidatorOptions = {
    required?: boolean;
    maxTotalSize?: number;
};

export type AttachmentsValidator = ReturnType<typeof getAttachmentsValidator>;

const getAttachmentsValidator =
    (
        options: AttachmentsValidatorOptions = {},
        otherAttachments?: Attachment[],
    ): ValidationFunction<AttachmentsValidationResult> =>
    (attachments: Attachment[] = []) => {
        const { required, maxTotalSize = MAX_TOTAL_ATTACHMENT_SIZE_BYTES } = options;
        const uploadedAttachments = attachments.filter((attachment) => attachmentHasBeenUploaded(attachment));
        const totalSizeInBytes: number = getTotalSizeOfAttachments([
            ...uploadedAttachments,
            ...(otherAttachments || []),
        ]);
        if (required) {
            if (attachments.length === 0) {
                return ValidateAttachmentsError.noAttachmentsUploaded;
            }
        }
        if (totalSizeInBytes > maxTotalSize) {
            return ValidateAttachmentsError.maxTotalSizeExceeded;
        }
        if (uploadedAttachments.length > 100) {
            return ValidateAttachmentsError.tooManyAttachments;
        }
        if (required && uploadedAttachments.length === 0) {
            return ValidateAttachmentsError.noAttachmentsUploaded;
        }
        return undefined;
    };

export default getAttachmentsValidator;
