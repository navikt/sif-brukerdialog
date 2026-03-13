import * as Sentry from '@sentry/nextjs';
import axios from 'axios';

export const logApiErrorToSentry = (error: unknown, context: string, options?: { ignore401?: boolean }) => {
    if (axios.isAxiosError(error)) {
        const extra = { code: error.code, status: error.response?.status, message: error.message };
        if (error.code === 'ERR_NETWORK') {
            Sentry.captureMessage(`${context}-network`, { level: 'info', extra });
        } else if (options?.ignore401 && error.response?.status === 401) {
            return;
        } else {
            Sentry.captureException(error, { extra: { ...extra, context } });
        }
    } else if (error instanceof Error) {
        Sentry.captureException(error, { extra: { context, message: error.message } });
    }
};
