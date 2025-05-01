import { Søker } from '@navikt/sif-common-api';
import { LoadingPage } from '@navikt/sif-common-soknad-ds/src';
import HentDeltakerErrorPage from '../../components/pages/HentDeltakerErrorPage';
import { SøknadProvider } from './context/SoknadContext';
import { useBarn } from './hooks/api/useBarn';
import { useKontonummer } from './hooks/api/useKontonummer';
import SøknadRouter from './SøknadRouter';

interface SøknadAppProps {
    søker: Søker;
    deltakelsePeriode;
}

const SøknadApp = ({ søker, deltakelsePeriode }: SøknadAppProps) => {
    const kontonummer = useKontonummer();
    const barn = useBarn();

    const isLoading = barn.isLoading || kontonummer.isLoading;
    const error = barn.isError;

    if (isLoading) {
        return <LoadingPage />;
    }

    if (error) {
        return <HentDeltakerErrorPage error="Feil ved lasting" />;
    }

    return (
        <SøknadProvider
            søker={søker}
            deltakelsePeriode={deltakelsePeriode}
            kontonummer={kontonummer.data === null ? undefined : kontonummer.data?.kontonummer}
            barn={barn.data || []}>
            <SøknadRouter />
        </SøknadProvider>
    );
};

export default SøknadApp;
