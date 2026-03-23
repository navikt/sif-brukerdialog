import { UngdomsytelseInntektsrapportering } from '@navikt/k9-brukerdialog-prosessering-api';
import { BrukerdialogOppgaveDto, OppgaveStatus } from '@navikt/ung-brukerdialog-api';
import dayjs from 'dayjs';

import { RapporterInntektOppgave } from '../../src/types/Oppgave';
import { store } from '../state/store';
import { getMockToday } from './mockDate';

const ISODateFormat = 'YYYY-MM-DD';

const dateToISODate = (date: Date): string => dayjs(date).format(ISODateFormat);

function updateOppgave(ref: string, oppgaveUpdaterFunc: (oppgave: any) => any) {
    const state = store.get();
    const oppgaver = state.oppgaver.map((oppgave: any) =>
        oppgave.oppgaveReferanse === ref ? oppgaveUpdaterFunc(oppgave) : oppgave,
    );
    store.set({ ...state, oppgaver });
    return oppgaver.find((o: any) => o.oppgaveReferanse === ref);
}

export const mockUtils = {
    setDeltakelseSøktFor: () => {
        const state = store.get();
        const deltakelser = state.deltakelser.map((deltakelse, idx) =>
            idx === 0 ? { ...deltakelse, søktTidspunkt: getMockToday().toISOString() } : deltakelse,
        );
        store.set({ ...state, deltakelser });
    },

    setOppgavebekreftelse: (ref: string, data: any) => {
        const oppdatertData: Partial<BrukerdialogOppgaveDto> = {
            respons: {
                type: 'VARSEL_SVAR',
                harUttalelse: data.oppgave.uttalelse.harUttalelse,
                uttalelseFraBruker: data.oppgave.uttalelse.uttalelseFraDeltaker, // brukerdialog prosessering kaller det uttalelseFraDeltaker, ikke uttalelseFraBruker
            },
            løstDato: getMockToday().toISOString(),
            status: OppgaveStatus.LØST,
        };
        return updateOppgave(ref, (oppgave) => {
            return {
                ...oppgave,
                ...oppdatertData,
            };
        });
    },

    setRapportertInntekt: (ref: string, data: UngdomsytelseInntektsrapportering) => {
        const getOppdatertData = (oppgave: RapporterInntektOppgave): Partial<BrukerdialogOppgaveDto> => {
            const oppdatertOppgave: Partial<BrukerdialogOppgaveDto> = {
                oppgavetypeData: {
                    ...oppgave.oppgavetypeData,
                    type: 'INNTEKTSRAPPORTERING',
                    fraOgMed: dateToISODate(oppgave.oppgavetypeData.fraOgMed),
                    tilOgMed: dateToISODate(oppgave.oppgavetypeData.fraOgMed),
                },
                respons: {
                    type: 'RAPPORTERT_INNTEKT',
                    fraOgMed: dateToISODate(oppgave.oppgavetypeData.fraOgMed),
                    tilOgMed: dateToISODate(oppgave.oppgavetypeData.fraOgMed),
                    arbeidstakerOgFrilansInntekt: data.oppgittInntekt.arbeidstakerOgFrilansInntekt || 0,
                },
                løstDato: getMockToday().toISOString(),
                status: OppgaveStatus.LØST,
            };
            return oppdatertOppgave;
        };

        return updateOppgave(ref, (oppgave) => ({
            ...oppgave,
            ...getOppdatertData(oppgave),
        }));
    },
};
