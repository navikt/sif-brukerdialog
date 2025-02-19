import { parseMaybeDateStringToDate } from '@navikt/sif-common-api';
import { z } from 'zod';
import { Oppgavetype } from './Oppgavetype';

export enum Oppgavestatus {
    LØST = 'LØST',
    ULØST = 'ULØST',
}

/**
 * Oppgave når deltaker må bekrefte endret startdato.
 */
export const bekreftEndretStartdatoOppgaveSchema = z.object({
    id: z.string(),
    status: z.nativeEnum(Oppgavestatus),
    opprettetDato: z.preprocess((val) => parseMaybeDateStringToDate(val), z.date()),
    løstDato: z
        .preprocess((val) => parseMaybeDateStringToDate(val), z.date())
        .nullable()
        .optional(),
    oppgavetype: z.literal(Oppgavetype.BEKREFT_ENDRET_STARTDATO),
    startdato: z.preprocess((val) => parseMaybeDateStringToDate(val), z.date()).optional(),
    svarfrist: z
        .preprocess((val) => parseMaybeDateStringToDate(val), z.date())
        .nullable()
        .optional(),
});

/**
 * Oppgave når deltaker må bekrefte endret sluttdato.
 */
export const bekreftEndretSluttdatoSchema = z.object({
    id: z.string(),
    status: z.nativeEnum(Oppgavestatus),
    opprettetDato: z.preprocess((val) => parseMaybeDateStringToDate(val), z.date()),
    løstDato: z
        .preprocess((val) => parseMaybeDateStringToDate(val), z.date())
        .nullable()
        .optional(),
    oppgavetype: z.literal(Oppgavetype.BEKREFT_ENDRET_SLUTTDATO),
    sluttdato: z.preprocess((val) => parseMaybeDateStringToDate(val), z.date()),
    svarfrist: z
        .preprocess((val) => parseMaybeDateStringToDate(val), z.date())
        .nullable()
        .optional(),
});

/**
 * Union av alle typer oppgaver.
 */
export const oppgaveSchema = z.union([bekreftEndretStartdatoOppgaveSchema, bekreftEndretSluttdatoSchema]);

export type BekreftEndretStartdatoOppgave = z.infer<typeof bekreftEndretStartdatoOppgaveSchema>;
export type BekreftEndretSluttdatoOppgave = z.infer<typeof bekreftEndretSluttdatoSchema>;
export type Oppgave = z.infer<typeof oppgaveSchema>;
