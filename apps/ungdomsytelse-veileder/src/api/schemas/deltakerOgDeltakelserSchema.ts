import { z } from 'zod';
import { deltakerSchema } from './personSchema';
import { deltakelserSchema } from './deltakelserSchema';

export const deltakerOgDeltakelserSchema = z.object({
    deltaker: deltakerSchema,
    deltakelser: deltakelserSchema,
});
