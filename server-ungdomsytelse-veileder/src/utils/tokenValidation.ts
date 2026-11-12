import { getToken, validateToken } from '@navikt/oasis';
import { NextFunction, Request, Response } from 'express';
import { CORRELATION_ID_HEADER } from './correlationId.js';
import logger from './log.js';

// Utelater NO_MATCHING_KEY: den utløses av tokenets kid, ikke av at JWKS er nede.
const JWKS_UNAVAILABLE_CODES = ['ERR_JWKS_TIMEOUT', 'ERR_JWKS_INVALID'];

export const verifyToken = async (request: Request, response: Response, next: NextFunction) => {
    const token = getToken(request);
    const path = request.originalUrl.split('?')[0];

    if (!token) {
        logger.warning(
            `No token found in request - ${request.method} ${path} (correlationId: ${request.headers[CORRELATION_ID_HEADER]})`,
        );
        response.status(401).send();
        return;
    }

    const validation = await validateToken(token);
    if (!validation.ok) {
        // Jose-feilen kan inneholde tokenets payload. Logg bare kode.
        const { error } = validation;
        const code = 'code' in error && typeof error.code === 'string' ? error.code : 'unknown';
        logger.warning(
            `Invalid token validation - ${request.method} ${path} (correlationId: ${request.headers[CORRELATION_ID_HEADER]}) - errorType: ${validation.errorType}, code: ${code}`,
        );
        response.status(JWKS_UNAVAILABLE_CODES.includes(code) ? 503 : 403).send();
        return;
    }

    next();
};
