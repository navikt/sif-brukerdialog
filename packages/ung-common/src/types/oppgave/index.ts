import { z } from 'zod';
import { oppgaveCommonSchema } from './OppgaveCommon';
import { Oppgavetype } from './Oppgavetype';
import { endretStartdatoOppgaveDataSchema } from '.';
import { endretSluttdatoOppgaveDataSchema } from './EndretSluttdatoOppgaveData';

export * from './EndretSluttdatoOppgaveData';
export * from './EndretStartdatoOppgaveData';
export * from './OppgaveCommon';
export * from './Oppgaveløsning';
export * from './Oppgavestatus';

export const oppgaveEndretStartdatoSchema = oppgaveCommonSchema.extend({
    oppgavetype: z.literal(Oppgavetype.BEKREFT_ENDRET_STARTDATO),
    oppgavetypeData: endretStartdatoOppgaveDataSchema,
});

export const oppgaveEndretSluttdatoSchema = oppgaveCommonSchema.extend({
    oppgavetype: z.literal(Oppgavetype.BEKREFT_ENDRET_SLUTTDATO),
    oppgavetypeData: endretSluttdatoOppgaveDataSchema,
});

export type OppgaveEndretStartdato = z.infer<typeof oppgaveEndretStartdatoSchema>;
export type OppgaveEndretSluttdato = z.infer<typeof oppgaveEndretSluttdatoSchema>;

export const oppgaveSchema = z.union([oppgaveEndretStartdatoSchema, oppgaveEndretSluttdatoSchema]);
export type Oppgave = z.infer<typeof oppgaveSchema>;
