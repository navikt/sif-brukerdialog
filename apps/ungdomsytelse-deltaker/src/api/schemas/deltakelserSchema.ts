import { z } from 'zod';
import { deltakelseSchema } from './deltakelseSchema';

export const deltakelserResponseSchema = z.array(deltakelseSchema);
