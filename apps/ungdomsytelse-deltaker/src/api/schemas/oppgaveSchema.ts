import { parseMaybeDateStringToDate } from '@navikt/sif-common-api';
import { z } from 'zod';
import { Oppgavetype } from '../../types/Oppgavetype';

/** DTO typer */

export const bekreftEndretStartdatoOppgaveDTOSchema = z.object({
    type: z.literal(Oppgavetype.BEKREFT_ENDRET_STARTDATO),
    startdato: z.string(),
    svarfrist: z.string(),
});

export const bekreftEndretSluttdatoDTOSchema = z.object({
    type: z.literal(Oppgavetype.BEKREFT_ENDRET_SLUTTDATO),
    sluttdato: z.string(),
    svarfrist: z.string(),
});

/** Parsed typer */

export const bekreftEndretStartdatoOppgaveSchema = z.object({
    type: z.literal(Oppgavetype.BEKREFT_ENDRET_STARTDATO),
    startdato: z.preprocess((val) => parseMaybeDateStringToDate(val), z.date()),
    svarfrist: z.preprocess((val) => parseMaybeDateStringToDate(val), z.date()),
});

export const bekreftEndretSluttdatoSchema = z.object({
    type: z.literal(Oppgavetype.BEKREFT_ENDRET_SLUTTDATO),
    sluttdato: z.preprocess((val) => parseMaybeDateStringToDate(val), z.date()),
    svarfrist: z.preprocess((val) => parseMaybeDateStringToDate(val), z.date()),
});

export const oppgaveDTOSchema = z.union([bekreftEndretStartdatoOppgaveDTOSchema, bekreftEndretSluttdatoDTOSchema]);
export const oppgaveSchema = z.union([bekreftEndretStartdatoOppgaveSchema, bekreftEndretSluttdatoSchema]);

export type BekreftEndretStartdatoOppgave = z.infer<typeof bekreftEndretStartdatoOppgaveSchema>;
export type BekreftEndretSluttdatoOppgave = z.infer<typeof bekreftEndretSluttdatoSchema>;
export type Oppgave = z.infer<typeof oppgaveSchema>;
