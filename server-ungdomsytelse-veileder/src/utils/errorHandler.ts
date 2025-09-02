import axios from 'axios';
import type { NextFunction, Request, Response } from 'express';
import logger from './log.js';

export function errorHandling(
    error: Error,
    request: Request,
    response: Response,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _next: NextFunction,
) {
    const errorInfo = {
        message: error.message,
        url: request.url,
        method: request.method,
        timestamp: new Date().toISOString(),
    };

    if (axios.isAxiosError(error)) {
        logger.error('Axios error occurred', {
            ...errorInfo,
            statusCode: error.response?.status,
        });
    } else {
        logger.error('Server error occurred', errorInfo);
    }

    response.status(500).json({ error: 'Internal server error' });
}
