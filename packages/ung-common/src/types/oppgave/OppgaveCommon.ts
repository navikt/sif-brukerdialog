import { parseMaybeDateStringToDate } from '@navikt/sif-common-api';
import { z } from 'zod';
import { Oppgavetype } from './Oppgavetype';
import { Oppgaveløsning } from './Oppgaveløsning';
import { Oppgavestatus } from './Oppgavestatus';

export const oppgaveCommonSchema = z.object({
    id: z.string(),
    oppgavetype: z.nativeEnum(Oppgavetype),
    status: z.nativeEnum(Oppgavestatus),
    opprettetDato: z.preprocess((val) => parseMaybeDateStringToDate(val), z.date()),
    svarfrist: z
        .preprocess((val) => parseMaybeDateStringToDate(val), z.date())
        .nullable()
        .optional(),
    løstDato: z
        .preprocess((val) => parseMaybeDateStringToDate(val), z.date())
        .nullable()
        .optional(),
    løsningstype: z.nativeEnum(Oppgaveløsning).nullable().optional(),
    åpnetAvDeltaker: z.date().nullable().optional(),
    veilederReferanse: z.string().optional(),
});
