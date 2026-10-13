import { ValidationFunction } from './types';

const MAX_TOTAL_VEDLEGG_SIZE_BYTES = 24 * 1024 * 1024;
const MAX_VEDLEGG_COUNT = 100;

export enum ValidateVedleggError {
    noVedleggUploaded = 'noVedleggUploaded',
    tooManyVedlegg = 'tooManyVedlegg',
    maxTotalSizeExceeded = 'maxTotalSizeExceeded',
}

export const ValidateVedleggErrorKeys = Object.keys(ValidateVedleggError);

type VedleggValidationResult = undefined | ValidateVedleggError;

interface Options {
    required?: boolean;
    otherFiles?: any[];
}

export const getVedleggValidator =
    (options: Options = {}): ValidationFunction<VedleggValidationResult> =>
    (value: any) => {
        const { required = false, otherFiles = [] } = options;
        const files: any[] = Array.isArray(value) ? value : [];
        const uploadedFiles = files.filter((f) => f.uploaded && !f.error);

        if (required && uploadedFiles.length === 0) {
            return ValidateVedleggError.noVedleggUploaded;
        }
        if (uploadedFiles.length > MAX_VEDLEGG_COUNT) {
            return ValidateVedleggError.tooManyVedlegg;
        }
        const otherUploadedFiles: any[] = otherFiles.filter((f) => f.uploaded && !f.error);
        const allFiles = [...uploadedFiles, ...otherUploadedFiles];
        const totalSize: number = allFiles.reduce((sum: number, f: any) => sum + (f.file?.size ?? 0), 0);
        if (totalSize > MAX_TOTAL_VEDLEGG_SIZE_BYTES) {
            return ValidateVedleggError.maxTotalSizeExceeded;
        }
        return undefined;
    };
