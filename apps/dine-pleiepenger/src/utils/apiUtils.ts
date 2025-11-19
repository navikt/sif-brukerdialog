import { isAxiosError } from 'axios';
import { NextApiRequest } from 'next';
import z from 'zod';

import { createDemoRequestContext, createRequestContext } from '../auth/withAuthentication';
import { isLocal } from './env';
import { getZodErrorsInfo } from './zodUtils';

export const getXRequestId = (req: NextApiRequest): string => {
    return (req.headers['x-request-id'] as string) || 'undefined-x-request-id';
};

export const getContextForApiHandler = (req: NextApiRequest) => {
    const context = !isLocal
        ? createRequestContext(getXRequestId(req), req.headers['authorization'])
        : createDemoRequestContext(req);

    if (!context || context === null) {
        throw new Error('Access denied - context is undefined', { cause: 'context is undefined' });
    }

    return context;
};

/**
 * Går gjennom objekt og sletter alle nøkler med null-verdier, erstatter med undefined
 */
export const deleteNullValues = (obj: unknown): unknown => {
    if (obj === null) {
        return undefined;
    }
    if (Array.isArray(obj)) {
        return obj.map(deleteNullValues);
    }
    if (typeof obj === 'object') {
        return Object.fromEntries(
            Object.entries(obj)
                .filter(([, value]) => value !== null)
                .map(([key, value]) => [key, deleteNullValues(value)]),
        );
    }
    return obj;
};

/**
 * Transform response data for server-side axios calls
 * Brukes som transformResponse i axios config
 */
export const serverResponseTransform = (data: string): unknown => {
    try {
        const parsed = JSON.parse(data);
        return deleteNullValues(parsed);
    } catch {
        return data;
    }
};

export const prepApiError = (err: unknown): unknown => {
    if (err instanceof z.ZodError) {
        return JSON.stringify(getZodErrorsInfo(err));
    } else if (isAxiosError(err)) {
        return `${err.code || 'NO_CODE'}${err.response?.status ? ' ' + err.response.status : ''}${err.response?.statusText ? ' ' + err.response.statusText : ''} ${err.message}`;
    }
    return err;
};
