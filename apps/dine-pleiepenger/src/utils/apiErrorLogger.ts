import { appLogger } from '@sif/apm';
import axios from 'axios';

export const logApiError = (error: unknown, context: string, options?: { ignore401?: boolean }) => {
    if (axios.isAxiosError(error)) {
        const status = error.response?.status;

        if (options?.ignore401 && status === 401) {
            return;
        }

        if (error.code === 'ERR_NETWORK') {
            appLogger.logError(`${context}-network`);
            return;
        }

        if (status === 403) {
            appLogger.logError(`${context}-forbidden`);
            return;
        }

        // Sanitert: sender kun context og statuskode, ikke rå Axios-detaljer
        appLogger.logException(new Error(`${context}: HTTP ${status ?? error.code ?? 'unknown'}`));
    } else if (error instanceof Error) {
        appLogger.logException(error);
    }
};
