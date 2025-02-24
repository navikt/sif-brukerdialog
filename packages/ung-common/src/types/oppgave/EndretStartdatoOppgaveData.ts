import { z } from 'zod';
import { parseMaybeDateStringToDate } from '@navikt/sif-common-api';

/**
 * Oppgave når deltaker må bekrefte endre startdato.
 */
const godkjentResponsSchema = z.object({
    godkjent: z.literal(true),
});

const ikkeGodkjentResponsSchema = z.object({
    godkjent: z.literal(false),
    meldingFraDeltaker: z.string(),
    korrigertStartdato: z.preprocess((val) => parseMaybeDateStringToDate(val), z.date()),
});

export const endretStartdatoOppgaveDataSchema = z.object({
    nyStartdato: z.preprocess((val) => parseMaybeDateStringToDate(val), z.date()),
    meldingFraVeileder: z.string().nullable().optional(),
    responsFraDeltaker: z.union([godkjentResponsSchema, ikkeGodkjentResponsSchema]).optional(),
});

export type EndretStartdatoOppgaveData = z.infer<typeof endretStartdatoOppgaveDataSchema>;
