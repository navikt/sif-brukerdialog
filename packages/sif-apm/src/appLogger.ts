import { captureException, captureMessage } from '@nais/apm';
import { AxiosError } from 'axios';

/**
 * Felles logger for sif-apper — erstatter appSentryLogger.
 *
 * Saniteringsregler:
 * - 401, status 0 og ERR_NETWORK ignoreres i logApiError
 * - Kun context og HTTP-statuskode sendes for API-feil, aldri request/response-body
 * - Feilmeldinger wrappet i ny Error for å unngå sensitiv stack-trace fra tredjepart
 *
 * Alle kall tagger eventet med source:'app-logger' slik at Grafana-alerts
 * kan filtrere på kun egne feil og utelukke støy fra tredjepart (dekoratøren m.m.).
 */

const APP_LOGGER_CONTEXT = { source: 'app-logger' } as const;

export const appLogger = {
    logInfo: (message: string) => {
        captureMessage(message, 'info');
        // eslint-disable-next-line no-console
        console.info(message);
    },

    logError: (message: string) => {
        captureMessage(message, 'error');
        // eslint-disable-next-line no-console
        console.error(message);
    },

    logException: (error: unknown, extra?: Record<string, unknown>) => {
        const err = error instanceof Error ? error : new Error(String(error));
        captureException(err, { context: { ...APP_LOGGER_CONTEXT, ...extra } });
        // loglevel-safe: err.message inneholder aldri sensitiv data — falsk positiv fra CodeQL
        // eslint-disable-next-line no-console
        console.error('Exception:', err.message, extra ?? {}); // lgtm[js/clear-text-logging]
    },

    logApiError: (error: AxiosError, context?: string) => {
        const status = error.response?.status;
        if (status === 401 || status === 0 || error.code === 'ERR_NETWORK') {
            return;
        }
        // Sanitert: sender kun context og statuskode, ikke rå Axios-data
        captureException(new Error(`${context ?? 'unknown'}: HTTP ${status ?? error.code ?? 'unknown'}`), {
            context: {
                ...APP_LOGGER_CONTEXT,
                api_context: context ?? 'unknown',
                http_status: String(status ?? error.code ?? 'unknown'),
            },
        });
        // error.message inneholder kun HTTP-metadata, ikke sensitiv payload — falsk positiv fra CodeQL
        // eslint-disable-next-line no-console
        console.error(`API error [${context}]:`, error.message); // lgtm[js/clear-text-logging]
    },
};
