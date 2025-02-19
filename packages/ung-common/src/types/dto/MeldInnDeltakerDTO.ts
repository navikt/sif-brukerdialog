import { z } from 'zod';

export const meldInnDeltakerDTOSchema = z.object({
    deltakerIdent: z.string().length(11),
    startdato: z.string().date(),
});

export type MeldInnDeltakerDTO = z.infer<typeof meldInnDeltakerDTOSchema>;
