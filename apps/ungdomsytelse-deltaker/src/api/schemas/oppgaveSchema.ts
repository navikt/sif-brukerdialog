import { parseMaybeDateStringToDate } from '@navikt/sif-common-api';
import { z } from 'zod';

export enum Oppgavetype {
    bekreftEndretStartdato = 'bekreftEndretStartdato',
    bekreftEndretSluttdato = 'bekreftEndretSluttdato',
}

/** DTO typer */

export const bekreftEndretStartdatoOppgaveDTOSchema = z.object({
    type: z.literal(Oppgavetype.bekreftEndretStartdato),
    startdato: z.string(),
    frist: z.string(),
});
export const bekreftEndretSluttdatoDTOSchema = z.object({
    type: z.literal(Oppgavetype.bekreftEndretSluttdato),
    sluttdato: z.string(),
    frist: z.string(),
});

/** Parsed typer */

export const bekreftEndretStartdatoOppgaveSchema = z.object({
    type: z.literal(Oppgavetype.bekreftEndretStartdato),
    startdato: z.preprocess((val) => parseMaybeDateStringToDate(val), z.date()),
    frist: z.preprocess((val) => parseMaybeDateStringToDate(val), z.date()),
});

export const bekreftEndretSluttdatoSchema = z.object({
    type: z.literal(Oppgavetype.bekreftEndretSluttdato),
    sluttdato: z.preprocess((val) => parseMaybeDateStringToDate(val), z.date()),
    frist: z.preprocess((val) => parseMaybeDateStringToDate(val), z.date()),
});

export const oppgaveDTOSchema = z.union([bekreftEndretStartdatoOppgaveDTOSchema, bekreftEndretSluttdatoDTOSchema]);
export const oppgaveSchema = z.union([bekreftEndretStartdatoOppgaveSchema, bekreftEndretSluttdatoSchema]);

export type BekreftEndretStartdatoOppgave = z.infer<typeof bekreftEndretStartdatoOppgaveSchema>;
export type BekreftEndretSluttdatoOppgave = z.infer<typeof bekreftEndretSluttdatoSchema>;
export type Oppgave = z.infer<typeof oppgaveSchema>;
