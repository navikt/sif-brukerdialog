// import { Attachment } from '@navikt/sif-common-core-ds/src/types/Attachment';
// import {
//     attachmentHasBeenUploaded,
//     getTotalSizeOfAttachments,
//     MAX_TOTAL_ATTACHMENT_SIZE_BYTES,
// } from '@navikt/sif-common-core-ds/src/utils/attachmentUtils';
// import { IntlErrorObject, ValidationResult } from '@navikt/sif-common-formik-ds';

// export enum ValidateAttachmentsError {
//     noAttachments = 'noAttachments',
//     tooManyAttachments = 'tooManyAttachments',
//     totalSizeExceeded = 'totalSizeExceeded',
// }

// export const validateAttachments = (
//     attachments: Attachment[],
//     required?: boolean,
// ): ValidationResult<IntlErrorObject> | undefined => {
//     const uploadedAttachments = attachments.filter((attachment) => attachmentHasBeenUploaded(attachment));
//     const totalSizeInBytes: number = getTotalSizeOfAttachments(uploadedAttachments);

//     if (totalSizeInBytes > MAX_TOTAL_ATTACHMENT_SIZE_BYTES) {
//         return { key: ValidateAttachmentsError.totalSizeExceeded };
//     }
//     if (uploadedAttachments.length > 100) {
//         return { key: ValidateAttachmentsError.tooManyAttachments };
//     }
//     if (required && uploadedAttachments.length === 0) {
//         return { key: ValidateAttachmentsError.noAttachments };
//     }
//     return undefined;
// };
