import { IntlErrorObject, ValidationFunction } from '@navikt/sif-common-formik-ds';
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

type AttachmentErrorsProp = Omit<IntlErrorObject, 'key'> & {
    keyPrefix: string;
};

export type AttachmentsValidatorOptions = {
    required?: boolean;
    maxTotalSize?: number;
    errors?: {
        [ValidateAttachmentsError.noAttachmentsUploaded]?: AttachmentErrorsProp;
        [ValidateAttachmentsError.tooManyAttachments]?: AttachmentErrorsProp;
        [ValidateAttachmentsError.maxTotalSizeExceeded]?: AttachmentErrorsProp;
    };
    intlErrorObject?: IntlErrorObject;
};

export type AttachmentsValidator = ReturnType<typeof getAttachmentsValidator>;

export const getAttachmentsValidator =
    (
        options: AttachmentsValidatorOptions = {},
        otherAttachments?: Attachment[],
    ): ValidationFunction<AttachmentsValidationResult | IntlErrorObject> =>
    (attachments: Attachment[] = []) => {
        const { required, maxTotalSize = MAX_TOTAL_ATTACHMENT_SIZE_BYTES, errors, intlErrorObject } = options;
        const uploadedAttachments = attachments.filter((attachment) => attachmentHasBeenUploaded(attachment));
        const totalSizeInBytes: number = getTotalSizeOfAttachments([
            ...uploadedAttachments,
            ...(otherAttachments || []),
        ]);

        const getErrorKey = (error: ValidateAttachmentsError) => {
            if (errors && errors[error]) {
                const errObj: IntlErrorObject = {
                    ...errors[error],
                    key: `${errors[error].keyPrefix}.${error}`,
                };
                return errObj;
            }
            if (intlErrorObject) {
                const errObj: IntlErrorObject = {
                    ...intlErrorObject,
                    key: `${intlErrorObject.key}.${error}`,
                };
                return errObj;
            }
            return error;
        };

        if (required) {
            if (attachments.length === 0) {
                return getErrorKey(ValidateAttachmentsError.noAttachmentsUploaded);
            }
        }
        if (totalSizeInBytes > maxTotalSize) {
            return getErrorKey(ValidateAttachmentsError.maxTotalSizeExceeded);
        }
        if (uploadedAttachments.length > 100) {
            return getErrorKey(ValidateAttachmentsError.tooManyAttachments);
        }
        if (required && uploadedAttachments.length === 0) {
            return getErrorKey(ValidateAttachmentsError.noAttachmentsUploaded);
        }
        return undefined;
    };
