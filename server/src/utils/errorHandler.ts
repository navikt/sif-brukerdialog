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
    // Log error med mer kontekst
    const errorInfo = {
        message: error.message,
        stack: error.stack,
        url: request.url,
        method: request.method,
        timestamp: new Date().toISOString(),
        correlationId: request.headers['X-Correlation-ID'],
    };

    if (axios.isAxiosError(error)) {
        logger.error('Axios error occurred', {
            ...errorInfo,
            statusCode: error.response?.status,
            responseData: error.response?.data,
            config: {
                url: error.config?.url,
                method: error.config?.method,
            },
        });

        // Return more specific error for axios errors
        return response.status(error.response?.status || 500).json({
            error: 'External service error',
            message: process.env.NODE_ENV === 'development' ? error.message : 'An error occurred',
        });
    }

    // Log general errors
    logger.error('Server error occurred', errorInfo);

    return response.status(500).json({
        error: 'Internal server error',
        message: process.env.NODE_ENV === 'development' ? error.message : 'An error occurred',
    });
}
