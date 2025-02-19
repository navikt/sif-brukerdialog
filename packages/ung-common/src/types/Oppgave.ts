import { parseMaybeDateStringToDate } from '@navikt/sif-common-api';
import { z } from 'zod';
import { Oppgavetype } from './Oppgavetype';

/**
 * Oppgave når deltaker må bekrefte endret startdato.
 */
export const bekreftEndretStartdatoOppgaveSchema = z.object({
    type: z.literal(Oppgavetype.BEKREFT_ENDRET_STARTDATO),
    startdato: z.preprocess((val) => parseMaybeDateStringToDate(val), z.date()),
    svarfrist: z.preprocess((val) => parseMaybeDateStringToDate(val), z.date()),
});

/**
 * Oppgave når deltaker må bekrefte endret sluttdato.
 */
export const bekreftEndretSluttdatoSchema = z.object({
    type: z.literal(Oppgavetype.BEKREFT_ENDRET_SLUTTDATO),
    sluttdato: z.preprocess((val) => parseMaybeDateStringToDate(val), z.date()),
    svarfrist: z.preprocess((val) => parseMaybeDateStringToDate(val), z.date()),
});

/**
 * Union av alle typer oppgaver.
 */
export const oppgaveSchema = z.union([bekreftEndretStartdatoOppgaveSchema, bekreftEndretSluttdatoSchema]);

export type BekreftEndretStartdatoOppgave = z.infer<typeof bekreftEndretStartdatoOppgaveSchema>;
export type BekreftEndretSluttdatoOppgave = z.infer<typeof bekreftEndretSluttdatoSchema>;
export type Oppgave = z.infer<typeof oppgaveSchema>;
