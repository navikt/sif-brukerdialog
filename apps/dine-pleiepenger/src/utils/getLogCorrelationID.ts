import { createChildLogger } from '@navikt/next-logger';
import { NextApiRequest } from 'next';
import { getXRequestId } from './apiUtils';

export const getChildLoggerContext = (xRequestId: string, context?: any) => {
    return {
        correlation_id: xRequestId,
        ...context,
    };
};

export const getLogger = (req: NextApiRequest) => {
    const reqId = getXRequestId(req);
    const childLogger = createChildLogger(reqId);

    return {
        info: (message: string, obj?: unknown) => {
            childLogger.info(getChildLoggerContext(reqId, obj), message);
        },
        warn: (message: string, obj?: unknown) => {
            childLogger.warn(getChildLoggerContext(reqId, obj), message);
        },
        error: (message: string, obj?: unknown) => {
            childLogger.error(getChildLoggerContext(reqId, obj), message);
        },
    };
};
