import { captureException } from '@nais/apm';
import { ZodError } from 'zod';

export const reportClientParseError = (error: ZodError, context: string): void => {
    captureException(error);
    console.error(`Client parse error (${context}):`, error.issues);
};
