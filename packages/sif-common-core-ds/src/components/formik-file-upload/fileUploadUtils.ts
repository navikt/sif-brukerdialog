import { FileRejectionReason } from '@navikt/ds-react';
import { isAxiosError } from 'axios';

import { CoreIntlShape } from '../../i18n/common.messages';
import { PersistedFile } from '../../types';

export enum FileUploadErrorReason {
    'ECONNABORTED' = 'ECONNABORTED',
    'BAD_REQUEST' = 'BAD_REQUEST',
    'UNKNOWN' = 'UNKNOWN',
}

export const getRejectedFileError = (
    { text }: CoreIntlShape,
    reason: FileRejectionReason | FileUploadErrorReason | string | undefined,
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
        case FileUploadErrorReason.ECONNABORTED:
            return text('@core.formikFileUpload.file-upload.error.retry');
        case FileUploadErrorReason.BAD_REQUEST:
            return text('@core.formikFileUpload.file-upload.error.bad-request');
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
        if (e.status === 400) {
            return FileUploadErrorReason.BAD_REQUEST;
        }
        return e.code ? e.code : e.message;
    }
    return FileUploadErrorReason.UNKNOWN;
};

export const canRetryFileUpload = (reason: string): boolean => {
    return reason === FileUploadErrorReason.ECONNABORTED;
};

export const mapFileToPersistedFile = ({ name, lastModified, type, size }: File | PersistedFile): PersistedFile => ({
    isPersistedFile: true,
    name,
    lastModified,
    type,
    size,
});
