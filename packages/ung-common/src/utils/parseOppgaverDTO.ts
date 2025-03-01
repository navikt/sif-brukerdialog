import { hentAlleDeltakelserGittDeltakerIdResponseItem, Oppgavetype } from '@navikt/ung-deltakelse-opplyser';
import { Oppgave } from '../types';
import { ISODateToDate } from '@navikt/sif-common-utils';
import { z } from 'zod';

const oppgaveDTOSchema = hentAlleDeltakelserGittDeltakerIdResponseItem.shape.oppgaver.element;

type OppgaveDTO = z.infer<typeof oppgaveDTOSchema>;

export const parseOppgaverDTO = (oppgaver: OppgaveDTO[]): Oppgave[] => {
    return oppgaver.map((oppgave) => {
        switch (oppgave.oppgavetype) {
            case Oppgavetype.BEKREFT_ENDRET_STARTDATO:
                return {
                    ...oppgave,
                    løstDato: oppgave.løstDato ? ISODateToDate(oppgave.løstDato) : undefined,
                    opprettetDato: ISODateToDate(oppgave.opprettetDato),
                    oppgavetype: Oppgavetype.BEKREFT_ENDRET_STARTDATO,
                    oppgavetypeData: {
                        nyStartdato: ISODateToDate((oppgave.oppgavetypeData as any).nyStartdato),
                        veilederRef: oppgave.oppgavetypeData.veilederRef!,
                        meldingFraVeileder: oppgave.oppgavetypeData.meldingFraVeileder,
                    },
                };
            case Oppgavetype.BEKREFT_ENDRET_SLUTTDATO:
                return {
                    ...oppgave,
                    løstDato: oppgave.løstDato ? ISODateToDate(oppgave.løstDato) : undefined,
                    opprettetDato: ISODateToDate(oppgave.opprettetDato),
                    oppgavetype: Oppgavetype.BEKREFT_ENDRET_SLUTTDATO,
                    oppgavetypeData: {
                        nySluttdato: ISODateToDate((oppgave.oppgavetypeData as any).nySluttdato),
                        veilederRef: oppgave.oppgavetypeData.veilederRef!,
                        meldingFraVeileder: oppgave.oppgavetypeData.meldingFraVeileder,
                    },
                };
        }
    });
};
