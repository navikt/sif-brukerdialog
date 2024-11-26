import { z } from 'zod';
import { personSchema } from './personSchema';
import { deltakelserSchema } from './deltakelserSchema';

export const deltakerSchema = z.object({
    deltakerIdent: z.string(),
    person: personSchema,
    deltakelser: deltakelserSchema,
});
