import { captureException, captureMessage } from '@nais/apm';
import { AxiosError } from 'axios';

const serializePayload = (payload: unknown): string => {
    if (typeof payload === 'string') {
        return payload;
    }
    if (payload instanceof Error) {
        return payload.message;
    }
    try {
        return JSON.stringify(payload);
    } catch {
        return String(payload);
    }
};

export const appLogger = {
    logInfo: (message: string, payload?: unknown) => {
        captureMessage(message);
        console.info(message, payload != null ? serializePayload(payload) : '');
    },
    logError: (message: string, payload?: unknown) => {
        captureMessage(message);
        console.error(message, payload != null ? serializePayload(payload) : '');
    },
    logException: (error: unknown, extra?: Record<string, unknown>) => {
        const err = error instanceof Error ? error : new Error(String(error));
        captureException(err);
        console.error('Exception:', err.message, extra ?? {});
    },
    logApiError: (error: AxiosError, context?: string) => {
        if (error.response?.status === 401 || error.response?.status === 0 || error.code === 'ERR_NETWORK') {
            return;
        }
        // Sanitert: sender kun context og statuskode, ikke rå Axios-data
        captureException(new Error(`API error [${context ?? 'unknown'}]: HTTP ${error.response?.status ?? error.code ?? 'unknown'}`));
        console.error(`API error [${context}]:`, error.message);
    },
};
