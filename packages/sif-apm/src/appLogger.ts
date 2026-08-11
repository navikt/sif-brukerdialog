import { captureException, captureMessage } from '@nais/apm';
import { AxiosError } from 'axios';

/**
 * Felles logger for sif-apper — erstatter appSentryLogger.
 *
 * Saniteringsregler:
 * - 401, status 0 og ERR_NETWORK ignoreres i logApiError
 * - Kun context og HTTP-statuskode sendes for API-feil, aldri request/response-body
 * - Feilmeldinger wrappet i ny Error for å unngå sensitiv stack-trace fra tredjepart
 */
export const appLogger = {
    logInfo: (message: string, payload?: unknown) => {
        captureMessage(message);
        // eslint-disable-next-line no-console
        console.info(message, payload ?? '');
    },

    logError: (message: string, payload?: unknown) => {
        captureMessage(message);
        // eslint-disable-next-line no-console
        console.error(message, payload ?? '');
    },

    logException: (error: unknown, extra?: Record<string, unknown>) => {
        const err = error instanceof Error ? error : new Error(String(error));
        captureException(err);
        // eslint-disable-next-line no-console
        console.error('Exception:', err.message, extra ?? {});
    },

    logApiError: (error: AxiosError, context?: string) => {
        const status = error.response?.status;
        if (status === 401 || status === 0 || error.code === 'ERR_NETWORK') {
            return;
        }
        // Sanitert: sender kun context og statuskode, ikke rå Axios-data
        captureException(new Error(`${context ?? 'unknown'}: HTTP ${status ?? error.code ?? 'unknown'}`));
        // eslint-disable-next-line no-console
        console.error(`API error [${context}]:`, error.message);
    },
};
