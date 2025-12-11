import { UngdomsytelseInntektsrapportering } from '@navikt/k9-brukerdialog-prosessering-api';
import { OppgaveDto } from '@navikt/ung-deltakelse-opplyser-api-deltaker';

import { RapporterInntektOppgave } from '../../src/types/Oppgave';
import { store } from '../state/store';
import { getMockToday } from './mockDate';

function updateOppgave(ref: string, oppgaveUpdaterFunc: (oppgave: any) => any) {
    const state = store.get();
    const deltakelser = state.deltakelser.map((deltakelse, idx) => {
        if (idx !== 0) return deltakelse;
        return {
            ...deltakelse,
            oppgaver: deltakelse.oppgaver.map((oppgave: any) =>
                oppgave.oppgaveReferanse === ref ? oppgaveUpdaterFunc(oppgave) : oppgave,
            ),
        };
    });
    store.set({ ...state, deltakelser });
    return deltakelser[0].oppgaver.find((o: any) => o.oppgaveReferanse === ref);
}

export const mockUtils = {
    setOppgaveSomÅpnet: (ref: string) =>
        updateOppgave(ref, (oppgave) => ({
            ...oppgave,
            åpnetDato: getMockToday().toISOString(),
        })),

    setOppgaveSomLukket: (ref: string) =>
        updateOppgave(ref, (oppgave) => ({
            ...oppgave,
            status: 'LUKKET',
            lukketDato: getMockToday().toISOString(),
        })),

    setDeltakelseSøktFor: () => {
        const state = store.get();
        const deltakelser = state.deltakelser.map((deltakelse, idx) =>
            idx === 0 ? { ...deltakelse, søktTidspunkt: getMockToday().toISOString() } : deltakelse,
        );
        store.set({ ...state, deltakelser });
    },

    setOppgavebekreftelse: (ref: string, data: any) => {
        const oppdatertData: Partial<any> = {
            bekreftelse: {
                harUttalelse: data.oppgave.uttalelse.harUttalelse,
                uttalelseFraBruker: data.oppgave.uttalelse.uttalelseFraDeltaker,
            },
            løstDato: getMockToday().toISOString(),
            status: 'LØST',
        };
        return updateOppgave(ref, (oppgave) => ({
            ...oppgave,
            ...oppdatertData,
        }));
    },

    setRapportertInntekt: (ref: string, data: UngdomsytelseInntektsrapportering) => {
        const getOppdatertData = (oppgave: RapporterInntektOppgave): Partial<OppgaveDto> =>
            ({
                oppgavetypeData: {
                    ...oppgave.oppgavetypeData,
                    fraOgMed: oppgave.oppgavetypeData.fraOgMed,
                    tilOgMed: oppgave.oppgavetypeData.fraOgMed,
                    rapportertInntekt: {
                        fraOgMed: oppgave.oppgavetypeData.fraOgMed,
                        tilOgMed: oppgave.oppgavetypeData.fraOgMed,
                        arbeidstakerOgFrilansInntekt: data.oppgittInntekt.arbeidstakerOgFrilansInntekt || 0,
                    },
                },
                løstDato: getMockToday().toISOString(),
                status: 'LØST',
            }) as any;

        setTimeout(() => {
            updateOppgave(ref, (oppgave) => ({
                ...oppgave,
                ...getOppdatertData(oppgave),
            }));
        }, 2500);

        return updateOppgave(ref, (oppgave): OppgaveDto => {
            return {
                ...oppgave,
                løstDato: getMockToday().toISOString(),
                status: 'LØST',
            };
        });
    },
};
