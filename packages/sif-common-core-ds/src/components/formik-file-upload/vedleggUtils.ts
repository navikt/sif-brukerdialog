import { FileRejectionReason } from '@navikt/ds-react';
import { CoreIntlShape } from '../../i18n/common.messages';

const SPLIT_KEY = 'vedlegg/';

export const getVedleggIdFromResponseHeader = (url: string) => {
    const id = url.split(SPLIT_KEY)[1];
    if (!id || id.length === 0) {
        throw new Error('Kunne ikke hente vedleggId fra url');
    }
    return id;
};

export const getRejectedFileError = (
    { text }: CoreIntlShape,
    reason: FileRejectionReason | string,
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
            return reason;
    }
};
