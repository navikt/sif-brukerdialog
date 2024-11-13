import { isAxiosError } from 'axios';
import { CoreIntlShape } from '../../i18n/common.messages';
import { FileRejectionReason } from '@navikt/ds-react';

export enum FileUploadErrorReason {
    'ECONNABORTED' = 'ECONNABORTED',
    'UNKNOWN' = 'UNKNOWN',
}

export const getRejectedFileError = (
    { text }: CoreIntlShape,
    reason: FileRejectionReason | FileUploadErrorReason | string,
    limits: {
        MAX_FILES: number;
        MAX_SIZE_MB: number;
    },
): string => {
    switch (reason) {
        case 'fileType':
            return text('@core.formikFileUpload.file-upload.error.fileType', limits);
        case 'fileSize':
            return text('@core.formikFileUpload.file-upload.error.fileSize', limits);
        default:
            return text('@core.formikFileUpload.file-upload.error.unknown', { reason });
    }
};

export const getFileUploadErrorReason = (e: unknown): string => {
    if (isAxiosError(e)) {
        switch (e.code) {
            case 'ECONNABORTED':
                return FileUploadErrorReason.ECONNABORTED;
        }
        return e.code ? e.code : e.message;
    }
    return FileUploadErrorReason.UNKNOWN;
};
