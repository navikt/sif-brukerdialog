import { createChildLogger } from '@navikt/next-logger';
import { NextApiRequest } from 'next';

import { getXRequestId } from './apiUtils';

const isDebugEnabled = process.env.LOG_LEVEL === 'debug' || process.env.NODE_ENV === 'development';

export const getChildLoggerContext = (xRequestId: string, context?: Record<string, unknown>) => {
    return {
        ...context,
        correlation_id: xRequestId,
    };
};

export type LogContext = Record<string, unknown>;

export interface Logger {
    info: (message: string, context?: LogContext) => void;
    warn: (message: string, context?: LogContext) => void;
    error: (message: string, context?: LogContext) => void;
    debug: (message: string, context?: LogContext) => void;
    withContext: (baseContext: LogContext) => Logger;
    startTimer: (operation: string) => () => void;
}

export const getLogger = (req: NextApiRequest): Logger => {
    const reqId = getXRequestId(req);
    const childLogger = createChildLogger(reqId);

    const createLoggerWithContext = (baseContext: LogContext = {}): Logger => ({
        info: (message: string, context?: LogContext) => {
            childLogger.info(getChildLoggerContext(reqId, { ...baseContext, ...context }), message);
        },
        warn: (message: string, context?: LogContext) => {
            childLogger.warn(getChildLoggerContext(reqId, { ...baseContext, ...context }), message);
        },
        error: (message: string, context?: LogContext) => {
            childLogger.error(getChildLoggerContext(reqId, { ...baseContext, ...context }), message);
        },
        debug: (message: string, context?: LogContext) => {
            if (isDebugEnabled) {
                childLogger.debug(getChildLoggerContext(reqId, { ...baseContext, ...context }), message);
            }
        },
        withContext: (additionalContext: LogContext) => {
            return createLoggerWithContext({ ...baseContext, ...additionalContext });
        },
        startTimer: (operation: string) => {
            const start = performance.now();
            return () => {
                const durationMs = Math.round(performance.now() - start);
                childLogger.info(
                    getChildLoggerContext(reqId, { ...baseContext, operation, durationMs }),
                    `${operation} completed`,
                );
            };
        },
    });

    return createLoggerWithContext();
};
