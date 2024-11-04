import { z } from 'zod';

export const DateRangeSchema = z.object({
    from: z.date(),
    to: z.date(),
});

export const OpplæringsinstitusjonSchema = z.object({
    uuid: z.string(),
    navn: z.string(),
    periode: z.array(DateRangeSchema),
});

export type Opplæringsinstitusjon = z.infer<typeof OpplæringsinstitusjonSchema>;
