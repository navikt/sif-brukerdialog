import { z } from 'zod';

export const isoDateStringSchema = z
    .string()
    .min(10)
    .refine((val) => /^\d{4}-\d{2}-\d{2}$/.test(val), {
        message: 'Ugyldig datoformat. Påkrevd format er ÅÅÅÅ-MM-DD',
    });
