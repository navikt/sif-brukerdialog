import { z } from 'zod';

export const DateRangeSchema = z.object({
    from: z.date(),
    to: z.date(),
});

export const KursholderSchema = z.object({
    id: z.string(),
    navn: z.string(),
    periode: z.array(DateRangeSchema),
});

export type Kursholder = z.infer<typeof KursholderSchema>;
