export enum FileUploadErrorReason {
    ECONNABORTED = 'ECONNABORTED',
    BAD_REQUEST = 'BAD_REQUEST',
    UNKNOWN = 'UNKNOWN',
}

export const getFileUploadErrorReason = (e: unknown): FileUploadErrorReason => {
    if (e instanceof Error && (e.message === 'ECONNABORTED' || e.name === 'ECONNABORTED')) {
        return FileUploadErrorReason.ECONNABORTED;
    }

    const maybeAxios = e as any;
    if (maybeAxios?.code === 'ECONNABORTED') {
        return FileUploadErrorReason.ECONNABORTED;
    }
    if (maybeAxios?.status === 400 || maybeAxios?.response?.status === 400) {
        return FileUploadErrorReason.BAD_REQUEST;
    }

    return FileUploadErrorReason.UNKNOWN;
};

export const canRetryFileUpload = (reason: string): boolean => reason === FileUploadErrorReason.ECONNABORTED;
