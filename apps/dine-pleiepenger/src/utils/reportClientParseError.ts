import { captureException } from '@sif/apm';
import { ZodError } from 'zod';

export const reportClientParseError = (error: ZodError, context: string): void => {
    captureException(error, { context: { context, issues: JSON.stringify(error.issues) } });
};
