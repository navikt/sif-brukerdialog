import { parseMaybeDateStringToDate } from '@navikt/sif-common-api';
import { z } from 'zod';
import { inntektSchema } from '../Inntekt';

export const rapporteringsperiodeDTOSchema = z.object({
    fraOgMed: z.preprocess((val) => parseMaybeDateStringToDate(val), z.date()),
    tilOgMed: z.preprocess((val) => parseMaybeDateStringToDate(val), z.date()),
    harRapportert: z.boolean(),
    kanRapportere: z.boolean().optional(),
    fristForRapportering: z.preprocess((val) => parseMaybeDateStringToDate(val), z.date()).optional(),
    inntekt: z.preprocess((val) => (val === null ? undefined : val), inntektSchema.optional()),
});

export type RapporteringsperiodeDTO = z.infer<typeof rapporteringsperiodeDTOSchema>;
