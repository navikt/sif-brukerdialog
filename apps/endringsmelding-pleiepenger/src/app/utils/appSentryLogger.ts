import * as Sentry from '@sentry/react';
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

export const appSentryLogger = {
    logInfo: (message: string, payload?: unknown) =>
        Sentry.captureMessage(message, {
            level: 'info',
            extra: payload != null ? { info: serializePayload(payload) } : undefined,
        }),
    logError: (message: string, payload?: unknown) =>
        Sentry.captureMessage(message, {
            level: 'error',
            extra: payload != null ? { info: serializePayload(payload) } : undefined,
        }),
    logException: (error: unknown, extra?: Record<string, unknown>) => {
        const err = error instanceof Error ? error : new Error(String(error));
        const extraPayload: Record<string, unknown> = { ...(extra ?? {}) };
        if (!(error instanceof Error)) {
            extraPayload.originalValue = serializePayload(error);
        }
        return Sentry.captureException(err, {
            extra: Object.keys(extraPayload).length > 0 ? extraPayload : undefined,
        });
    },
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
