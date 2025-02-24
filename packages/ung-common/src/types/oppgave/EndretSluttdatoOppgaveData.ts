import { z } from 'zod';
import { parseMaybeDateStringToDate } from '@navikt/sif-common-api';

/**
 * Oppgave når deltaker må bekrefte endre sluttdato.
 */
const godkjentResponsSchema = z.object({
    godkjent: z.literal(true),
});

const ikkeGodkjentResponsSchema = z.object({
    godkjent: z.literal(false),
    meldingFraDeltaker: z.string(),
    korrigertSluttdato: z.preprocess((val) => parseMaybeDateStringToDate(val), z.date()),
});

export const endretSluttdatoOppgaveDataSchema = z.object({
    nySluttdato: z.preprocess((val) => parseMaybeDateStringToDate(val), z.date()),
    meldingFraVeileder: z.string().nullable().optional(),
    responsFraDeltaker: z.union([godkjentResponsSchema, ikkeGodkjentResponsSchema]).optional(),
});

export type EndretSluttdatoOppgaveData = z.infer<typeof endretSluttdatoOppgaveDataSchema>;
