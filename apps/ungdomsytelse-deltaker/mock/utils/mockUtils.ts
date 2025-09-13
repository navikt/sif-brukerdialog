// import { OppgaveStatus } from '@navikt/ung-common';
import { store } from '../state/store';

// import { UngdomsytelseOppgavebekreftelse } from '@navikt/k9-brukerdialog-prosessering-api';
// import { OppgaveDto } from '@navikt/ung-deltakelse-opplyser-api';

function updateOppgave(ref: string, updater: (oppgave: any) => any) {
    const state = store.get();
    const deltakelser = state.deltakelser.map((deltakelse, idx) => {
        if (idx !== 0) return deltakelse;
        return {
            ...deltakelse,
            oppgaver: deltakelse.oppgaver.map((oppgave: any) =>
                oppgave.oppgaveReferanse === ref ? updater(oppgave) : oppgave,
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
            åpnetDato: new Date().toISOString(),
        })),

    setOppgaveSomLukket: (ref: string) =>
        updateOppgave(ref, (oppgave) => ({
            ...oppgave,
            status: 'LUKKET',
            lukketDato: new Date().toISOString(),
        })),

    setDeltakelseSøktFor: () => {
        const state = store.get();
        const deltakelser = state.deltakelser.map((deltakelse, idx) =>
            idx === 0 ? { ...deltakelse, søktTidspunkt: new Date().toISOString() } : deltakelse,
        );
        store.set({ ...state, deltakelser });
    },

    setOppgavebekreftelse: (ref: string, data: any) => {
        const oppdatertData: Partial<any> = {
            bekreftelse: {
                harUttalelse: data.oppgave.uttalelse.harUttalelse,
                uttalelseFraBruker: data.oppgave.uttalelse.uttalelseFraDeltaker,
            },
            løstDato: new Date().toISOString(),
            status: 'LØST',
        };
        return updateOppgave(ref, (oppgave) => ({
            ...oppgave,
            ...oppdatertData,
        }));
    },

    setRapportertInntekt: (ref: string, data: any) => {
        console.log(`Inntekt rapportert for ${ref}`, data);
    },
};
