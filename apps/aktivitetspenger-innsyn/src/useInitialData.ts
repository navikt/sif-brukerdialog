import { OppgaveYtelsetype } from '@navikt/ung-brukerdialog-api';
import { Oppgave, Søker, useOppgaver, useSøker } from '@sif/api';

interface InitialData {
    søker: Søker;
    oppgaver: Oppgave[];
}

type InitialDataResult =
    | { status: 'loading' }
    | { status: 'error'; errors: unknown[] }
    | { status: 'success'; data: InitialData };

export const useInitialData = (): InitialDataResult => {
    const søker = useSøker();
    const oppgaver = useOppgaver(OppgaveYtelsetype.AKTIVITETSPENGER);

    const requiredQueries = [søker, oppgaver];

    if (requiredQueries.some((q) => q.isLoading)) {
        return { status: 'loading' };
    }

    const errors = [...requiredQueries].filter((q) => q.isError).map((q) => q.error);
    if (errors.length > 0) {
        return { status: 'error', errors };
    }

    if (!søker.data || !oppgaver.data) {
        return { status: 'error', errors: [new Error('Hent initial data feilet')] };
    }

    return {
        status: 'success',
        data: {
            søker: søker.data,
            oppgaver: oppgaver.data,
        },
    };
};
