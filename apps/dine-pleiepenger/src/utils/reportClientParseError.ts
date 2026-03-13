import * as Sentry from '@sentry/nextjs';
import { ZodError } from 'zod';

import { getFaro } from '../faro/faro';
import { Feature } from './features';

export const reportClientParseError = (error: ZodError, context: string): void => {
    if (Feature.FARO) {
        getFaro().api.pushError(error);
    }
    Sentry.captureException(error, {
        extra: { context, issues: error.issues },
    });
};
