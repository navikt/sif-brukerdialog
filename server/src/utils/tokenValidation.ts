import { getToken, validateToken } from '@navikt/oasis';
import { NextFunction, Request, Response } from 'express';
import logger from './log.js';

export const verifyToken = async (request: Request, response: Response, next: NextFunction) => {
    // Skip token validation for metrics endpoint used by Prometheus.
    // NAIS-plattformen skraper /metrics direkte fra poden (localhost:8080/metrics)
    // uten autentisering, så dette endepunktet må være åpent.
    if (request.path === '/metrics') {
        next();
        return;
    }

    const token = getToken(request);

    if (!token) {
        logger.warning(
            `No token found in request - ${request.method} ${request.url} (correlationId: ${request.headers['X-Correlation-ID']})`,
        );
        response.status(401).send();
        return;
    }

    const validation = await validateToken(token);
    if (!validation.ok) {
        logger.warning(
            `Invalid token validation - ${request.method} ${request.url} (correlationId: ${request.headers['X-Correlation-ID']}) - ${JSON.stringify(validation)}`,
        );
        response.status(403).send();
        return;
    }

    next();
};
