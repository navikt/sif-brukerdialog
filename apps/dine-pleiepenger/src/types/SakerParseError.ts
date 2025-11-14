import { ZodError } from 'zod';

export interface SakerParseError {
    antallSaker: number;
    error: ZodError;
}

export const isSakerParseError = (error: any): error is SakerParseError => {
    return error?.antallSaker !== undefined && error?.error instanceof ZodError;
};
