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
    logInfo: (message: string, payload?: unknown) =>
        console.info(message, payload != null ? serializePayload(payload) : ''),
    logError: (message: string, payload?: unknown) =>
        console.error(message, payload != null ? serializePayload(payload) : ''),
    logException: (error: unknown, extra?: Record<string, unknown>) => {
        const msg = error instanceof Error ? error.message : String(error);
        console.error('Exception:', msg, extra ?? {});
    },
    logApiError: (error: AxiosError, context?: string) => {
        if (error.response?.status === 401 || error.response?.status === 0 || error.code === 'ERR_NETWORK') {
            return;
        }
        console.error(`API error [${context}]:`, error.message);
    },
};
