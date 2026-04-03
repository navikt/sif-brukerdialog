import { describe, expect, it } from 'vitest';

import {
    canRetryFileUpload,
    FileUploadErrorReason,
    getFileUploadErrorReason,
    getRejectedFileError,
} from '../fileUploadUtils';

const limits = { MAX_FILES: 10, MAX_SIZE_MB: 8 };

const intl = {
    text: (key: string, values?: Record<string, unknown>) => {
        if (values) {
            return `${key}:${JSON.stringify(values)}`;
        }
        return key;
    },
};

describe('getRejectedFileError', () => {
    it('returnerer fileType-feilmelding med grenser', () => {
        const result = getRejectedFileError(intl, 'fileType', limits);
        expect(result).toBe('@sifSoknadForms.vedlegg.error.fileType:{"MAX_FILES":10,"MAX_SIZE_MB":8}');
    });

    it('returnerer fileSize-feilmelding med grenser', () => {
        const result = getRejectedFileError(intl, 'fileSize', limits);
        expect(result).toBe('@sifSoknadForms.vedlegg.error.fileSize:{"MAX_FILES":10,"MAX_SIZE_MB":8}');
    });

    it('returnerer timeout-feilmelding ved ECONNABORTED', () => {
        const result = getRejectedFileError(intl, FileUploadErrorReason.ECONNABORTED, limits);
        expect(result).toBe('@sifSoknadForms.vedlegg.error.timeout');
    });

    it('returnerer badRequest-feilmelding ved BAD_REQUEST', () => {
        const result = getRejectedFileError(intl, FileUploadErrorReason.BAD_REQUEST, limits);
        expect(result).toBe('@sifSoknadForms.vedlegg.error.badRequest');
    });

    it('returnerer ukjent feilmelding ved ukjent årsak', () => {
        const result = getRejectedFileError(intl, 'somethingElse', limits);
        expect(result).toBe('@sifSoknadForms.vedlegg.error.unknown');
    });

    it('returnerer ukjent feilmelding når årsak er undefined', () => {
        const result = getRejectedFileError(intl, undefined, limits);
        expect(result).toBe('@sifSoknadForms.vedlegg.error.unknown');
    });
});

describe('getFileUploadErrorReason', () => {
    it('returnerer ECONNABORTED for Error med melding ECONNABORTED', () => {
        expect(getFileUploadErrorReason(new Error('ECONNABORTED'))).toBe(FileUploadErrorReason.ECONNABORTED);
    });

    it('returnerer ECONNABORTED for axios-feil med code ECONNABORTED', () => {
        expect(getFileUploadErrorReason({ code: 'ECONNABORTED' })).toBe(FileUploadErrorReason.ECONNABORTED);
    });

    it('returnerer BAD_REQUEST ved status 400', () => {
        expect(getFileUploadErrorReason({ status: 400 })).toBe(FileUploadErrorReason.BAD_REQUEST);
    });

    it('returnerer BAD_REQUEST ved response.status 400', () => {
        expect(getFileUploadErrorReason({ response: { status: 400 } })).toBe(FileUploadErrorReason.BAD_REQUEST);
    });

    it('returnerer UNKNOWN for ukjent feil', () => {
        expect(getFileUploadErrorReason(new Error('network error'))).toBe(FileUploadErrorReason.UNKNOWN);
    });
});

describe('canRetryFileUpload', () => {
    it('returnerer true for ECONNABORTED', () => {
        expect(canRetryFileUpload(FileUploadErrorReason.ECONNABORTED)).toBe(true);
    });

    it('returnerer false for BAD_REQUEST', () => {
        expect(canRetryFileUpload(FileUploadErrorReason.BAD_REQUEST)).toBe(false);
    });

    it('returnerer false for UNKNOWN', () => {
        expect(canRetryFileUpload(FileUploadErrorReason.UNKNOWN)).toBe(false);
    });
});
