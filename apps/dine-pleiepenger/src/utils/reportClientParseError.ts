import { appLogger } from '@sif/apm';
import { ZodError } from 'zod';

export const reportClientParseError = (error: ZodError, context: string): void => {
    appLogger.logException(error, { context, issues: JSON.stringify(error.issues) });
};
