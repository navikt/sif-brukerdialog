import { NextApiRequest } from 'next';

import { createDemoRequestContext, createRequestContext } from '../auth/withAuthentication';
import { isLocal } from './env';

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

export const trimAxiosError = (error: any) => {
    try {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { config, ...rest } = error;
        return rest;
    } catch {
        return 'invalid error object';
    }
};

/**
 * Går gjennom objekt og sletter alle nøkler med null-verdier, erstatter med undefined
 */
export const deleteNullValues = (obj: any): any => {
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
export const serverResponseTransform = (data: string): any => {
    try {
        const parsed = JSON.parse(data);
        return deleteNullValues(parsed);
    } catch {
        return data;
    }
};
