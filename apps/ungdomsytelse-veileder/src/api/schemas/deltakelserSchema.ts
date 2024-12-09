import { z } from 'zod';
import { deltakelseSchema } from './deltakelseSchema';

export const deltakelserSchema = z.array(deltakelseSchema);
