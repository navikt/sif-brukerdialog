import { Søker } from '@navikt/sif-common-api';
import { DeltakelsePeriode, Oppgavetype } from '@navikt/ung-common';
import HentDeltakerErrorPage from '../../pages/HentDeltakerErrorPage';
import { SøknadProvider } from './context/SøknadContext';
import { useBarn } from './hooks/api/useBarn';
import { useKontonummer } from './hooks/api/useKontonummer';
import SøknadRouter from './SøknadRouter';
import IngenSendSøknadOppgave from '../../pages/IngenSendSøknadOppgave';
import UngLoadingPage from '../../pages/UngLoadingPage';

interface SøknadAppProps {
    søker: Søker;
    deltakelsePeriode: DeltakelsePeriode;
}

const SøknadApp = ({ søker, deltakelsePeriode }: SøknadAppProps) => {
    const kontonummer = useKontonummer();
    const barn = useBarn();

    if (barn.isLoading || kontonummer.isLoading) {
        return <UngLoadingPage />;
    }

    if (barn.isError || kontonummer.isError) {
        const errorMessage = barn.isError ? 'Feil ved lasting av barn' : 'Feil ved lasting av kontonummer';
        return <HentDeltakerErrorPage error={errorMessage} />;
    }

    const søknadOppgave = deltakelsePeriode.oppgaver.find((o) => o.oppgavetype === Oppgavetype.SØK_YTELSE);

    if (!søknadOppgave) {
        return <IngenSendSøknadOppgave />;
    }
    return (
        <SøknadProvider
            søknadOppgave={søknadOppgave}
            søker={søker}
            deltakelsePeriode={deltakelsePeriode}
            kontonummer={kontonummer.data?.harKontonummer ? kontonummer.data.kontonummer : undefined}
            barn={barn.data || []}>
            <SøknadRouter />
        </SøknadProvider>
    );
};

export default SøknadApp;
