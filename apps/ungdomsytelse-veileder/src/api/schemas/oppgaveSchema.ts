import { parseMaybeDateStringToDate } from '@navikt/sif-common-api';
import { z } from 'zod';

export enum Oppgavetype {
    bekreftEndretStartdato = 'bekreftEndretStartdato',
    bekreftEndretSluttdato = 'bekreftEndretSluttdato',
}

const oppgaveBaseSchema = z.object({
    type: z.nativeEnum(Oppgavetype),
});

export const bekreftEndretStartdatoOppgaveDTOSchema = oppgaveBaseSchema.extend({
    type: z.literal(Oppgavetype.bekreftEndretStartdato),
    startdato: z.string(),
    frist: z.string(),
    harBekreftet: z.boolean(),
});

export const bekreftEndretStartdatoOppgaveSchema = bekreftEndretStartdatoOppgaveDTOSchema.transform((data) => ({
    ...data,
    startdato: parseMaybeDateStringToDate(data.startdato),
    frist: parseMaybeDateStringToDate(data.frist),
}));

export const bekreftEndretSluttdatoDTOSchema = oppgaveBaseSchema.extend({
    type: z.literal(Oppgavetype.bekreftEndretStartdato),
    sluttdato: z.string(),
    frist: z.string(),
    harBekreftet: z.boolean(),
});

export const bekreftEndretSluttdatoSchema = bekreftEndretSluttdatoDTOSchema.transform((data) => ({
    ...data,
    sluttdato: parseMaybeDateStringToDate(data.sluttdato),
    frist: parseMaybeDateStringToDate(data.frist),
}));

export const oppgaveDTOSchema = z.union([bekreftEndretStartdatoOppgaveDTOSchema, bekreftEndretSluttdatoDTOSchema]);
export const oppgaveSchema = z.union([bekreftEndretStartdatoOppgaveSchema, bekreftEndretSluttdatoSchema]);

export type BekreftEndretStartdatoOppgave = z.infer<typeof bekreftEndretStartdatoOppgaveSchema>;
export type BekreftEndretSluttdatoOppgave = z.infer<typeof bekreftEndretSluttdatoSchema>;
export type Oppgave = z.infer<typeof oppgaveSchema>;
