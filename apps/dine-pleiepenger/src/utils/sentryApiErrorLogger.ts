import * as Sentry from '@sentry/nextjs';
import axios from 'axios';

export const logApiErrorToSentry = (error: unknown, context: string, options?: { ignore401?: boolean }) => {
    if (axios.isAxiosError(error)) {
        const extra = { context, code: error.code, status: error.response?.status };
        if (error.code === 'ERR_NETWORK') {
            Sentry.captureMessage(`${context}-network`, { level: 'info', extra });
        } else if (options?.ignore401 && error.response?.status === 401) {
            return;
        } else if (error.response?.status === 403) {
            Sentry.captureMessage(`${context}-forbidden`, { level: 'info', extra });
        } else {
            const sanitized = new Error(`${context}: ${error.message}`);
            Sentry.captureException(sanitized, { extra });
        }
    } else if (error instanceof Error) {
        Sentry.captureException(error, { extra: { context } });
    }
};
