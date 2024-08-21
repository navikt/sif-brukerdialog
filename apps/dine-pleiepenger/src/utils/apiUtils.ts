/* eslint-disable @typescript-eslint/no-unused-vars */
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
        const { config, ...rest } = error;
        return rest;
    } catch (e) {
        return 'invalid error object';
    }
};
