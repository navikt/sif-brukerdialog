import * as Sentry from '@sentry/react';
import { AxiosError } from 'axios';

export const appSentryLogger = {
    logInfo: (message: string, payload?: string) =>
        Sentry.captureMessage(message, { level: 'info', extra: payload ? { info: payload } : undefined }),
    logError: (message: string, payload?: string) =>
        Sentry.captureMessage(message, { level: 'error', extra: payload ? { info: payload } : undefined }),
    logApiError: (error: AxiosError, context?: string) => {
        if (error.response?.status === 401 || error.response?.status === 0 || error.code === 'ERR_NETWORK') {
            return;
        }
        Sentry.captureException(error, {
            extra: {
                context,
                xRequestId: error.response?.headers?.['x-request-id'],
                xCorrelationId: error.response?.headers?.['x-correlation-id'],
            },
        });
    },
};
