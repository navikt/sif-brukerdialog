import { parseMaybeDateStringToDate } from '@navikt/sif-common-api';
import { z } from 'zod';
import { Oppgavetype } from './Oppgavetype';

export enum Oppgavestatus {
    LØST = 'LØST',
    ULØST = 'ULØST',
}

export enum Oppgaveløsning {
    'GODKJENT_AV_DELTAKER' = 'GODKJENT_AV_DELTAKER',
    'IKKE_GODKJENT_AV_DELTAKER' = 'IKKE_GODKJENT_AV_DELTAKER',
    'TIDSFRIST_UTLØPT' = 'TIDSFRIST_UTLØPT',
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
    åpnet: z.date().nullable().optional(),
    løsningstype: z.nativeEnum(Oppgaveløsning).nullable().optional(),
    oppgavetype: z.literal(Oppgavetype.BEKREFT_ENDRET_STARTDATO),
    svarfrist: z
        .preprocess((val) => parseMaybeDateStringToDate(val), z.date())
        .nullable()
        .optional(),
    oppgavetypeData: z.object({
        nyStartdato: z.preprocess((val) => parseMaybeDateStringToDate(val), z.date()),
    }),
    fraVeileder: z
        .object({
            veilederReferanse: z.string(),
            melding: z.string().nullable().optional(),
        })
        .optional(),
    responsFraDeltaker: z
        .object({
            godkjent: z.boolean(),
            meldingFraDeltaker: z.string().nullable().optional(),
            korrigertStartdato: z
                .preprocess((val) => parseMaybeDateStringToDate(val), z.date())
                .nullable()
                .optional(),
        })
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
    svarfrist: z
        .preprocess((val) => parseMaybeDateStringToDate(val), z.date())
        .nullable()
        .optional(),
    oppgavetypeData: z.object({
        nySluttdato: z.preprocess((val) => parseMaybeDateStringToDate(val), z.date()),
    }),
    meldingFraVeileder: z.string().nullable().optional(),
});

/**
 * Union av alle typer oppgaver.
 */
export const oppgaveSchema = z.union([bekreftEndretStartdatoOppgaveSchema, bekreftEndretSluttdatoSchema]);

export type BekreftEndretStartdatoOppgave = z.infer<typeof bekreftEndretStartdatoOppgaveSchema>;
export type BekreftEndretSluttdatoOppgave = z.infer<typeof bekreftEndretSluttdatoSchema>;
export type Oppgave = z.infer<typeof oppgaveSchema>;
