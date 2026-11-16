import { NextFunction, Request, Response } from 'express';
import { v4 as uuid, validate } from 'uuid';

// Node gjør innkommende headernavn om til små bokstaver
export const CORRELATION_ID_HEADER = 'x-correlation-id';

// Gjenbruker ID-en fra frontend slik at kallet kan følges fra nettleser til backend. Bare gyldige UUID-er godtas, for å hindre logginjeksjon.
export const setCorrelationId = (request: Request, _response: Response, next: NextFunction) => {
    const id = request.headers[CORRELATION_ID_HEADER];
    request.headers[CORRELATION_ID_HEADER] = typeof id === 'string' && validate(id) ? id : uuid();
    next();
};
