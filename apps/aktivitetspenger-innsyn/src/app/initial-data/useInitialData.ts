import { OppgaveYtelsetype, TilgjengeligSøknadResponse } from '@navikt/ung-brukerdialog-api';
import { Søker, useSøker } from '@sif/api/k9-prosessering';
import { Oppgave, useOppgaver, useTilgjengeligAktivitetspengerSøknad } from '@sif/api/ung-brukerdialog';

interface InitialData {
    søker: Søker;
    oppgaver: Oppgave[];
    tilgjengeligSøknad: TilgjengeligSøknadResponse;
}

type InitialDataResult =
    { status: 'loading' } | { status: 'error'; errors: unknown[] } | { status: 'success'; data: InitialData };

export const useInitialData = (): InitialDataResult => {
    const søker = useSøker();
    const oppgaver = useOppgaver(OppgaveYtelsetype.AKTIVITETSPENGER);
    const tilgjengeligSøknad = useTilgjengeligAktivitetspengerSøknad();

    const requiredQueries = [søker, oppgaver, tilgjengeligSøknad];

    if (requiredQueries.some((q) => q.isPending)) {
        return { status: 'loading' };
    }

    const errors = [...requiredQueries].filter((q) => q.isError).map((q) => q.error);
    if (errors.length > 0) {
        return { status: 'error', errors };
    }

    if (!søker.data || !oppgaver.data || !tilgjengeligSøknad.data) {
        return { status: 'error', errors: [new Error('Hent initial data feilet')] };
    }

    return {
        status: 'success',
        data: {
            søker: søker.data,
            oppgaver: oppgaver.data,
            tilgjengeligSøknad: tilgjengeligSøknad.data,
        },
    };
};
