/**
 * Denne filen erstattes under build med env.schema.ts som ligger i hver enkelt app
 * - kopieringen gjøres i Dockerfile
 */

import { z } from 'zod';

export const envSchema = z.object({
    someEnv: z.string(),
});
