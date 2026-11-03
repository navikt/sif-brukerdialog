import { getToken, validateToken } from '@navikt/oasis';
import { NextFunction, Request, Response } from 'express';
import { CORRELATION_ID_HEADER } from './correlationId.js';
import logger from './log.js';

export const verifyToken = async (request: Request, response: Response, next: NextFunction) => {
    const token = getToken(request);

    if (!token) {
        logger.warning(
            `No token found in request - ${request.method} ${request.url} (correlationId: ${request.headers[CORRELATION_ID_HEADER]})`,
        );
        response.status(401).send();
        return;
    }

    const validation = await validateToken(token);
    if (!validation.ok) {
        logger.warning(
            `Invalid token validation - ${request.method} ${request.url} (correlationId: ${request.headers[CORRELATION_ID_HEADER]}) - ${JSON.stringify(validation)}`,
        );
        response.status(403).send();
        return;
    }

    next();
};
