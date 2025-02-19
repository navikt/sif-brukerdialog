import { parseMaybeDateStringToDate } from '@navikt/sif-common-api';
import { z } from 'zod';
import { oppgaveSchema } from '../Oppgave';
import { rapporteringsperiodeDTOSchema } from './RapporteringsperiodeDTO';

export const deltakelseDTOSchema = z.object({
    id: z.string(),
    programperiodeFraOgMed: z.preprocess((val) => parseMaybeDateStringToDate(val), z.date()),
    programperiodeTilOgMed: z.preprocess((val) => parseMaybeDateStringToDate(val), z.date().optional()),
    harSøkt: z.boolean(),
    oppgaver: z.array(oppgaveSchema),
    rapporteringsPerioder: z.array(rapporteringsperiodeDTOSchema).optional().nullable(),
});

export type DeltakelseDTO = z.infer<typeof deltakelseDTOSchema>;
