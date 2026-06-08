import { FileRejectionReason } from '@navikt/ds-react';
import { canRetryFileUpload, FileUploadErrorReason, getFileUploadErrorReason } from '@sif/rhf';

export { canRetryFileUpload, FileUploadErrorReason, getFileUploadErrorReason };

interface IntlText {
    text: (key: string, values?: Record<string, unknown>) => string;
}

export const getRejectedFileError = (
    { text }: IntlText,
    reason: FileRejectionReason | FileUploadErrorReason | string | undefined,
    limits: { MAX_FILES: number; MAX_SIZE_MB: number },
): string => {
    switch (reason) {
        case 'fileType':
            return text('@sifSoknadForms.vedlegg.error.fileType', limits);
        case 'fileSize':
            return text('@sifSoknadForms.vedlegg.error.fileSize', limits);
        case FileUploadErrorReason.ECONNABORTED:
            return text('@sifSoknadForms.vedlegg.error.timeout');
        case FileUploadErrorReason.BAD_REQUEST:
            return text('@sifSoknadForms.vedlegg.error.badRequest');
        default:
            return text('@sifSoknadForms.vedlegg.error.unknown');
    }
};
