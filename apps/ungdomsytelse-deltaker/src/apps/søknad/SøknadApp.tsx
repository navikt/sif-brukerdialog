import { Søker } from '@navikt/sif-common-api';
import { LoadingPage } from '@navikt/sif-common-soknad-ds/src';
import { DeltakelsePeriode } from '@navikt/ung-common';
import HentDeltakerErrorPage from '../../components/pages/HentDeltakerErrorPage';
import { SøknadProvider } from './context/SøknadContext';
import { useBarn } from './hooks/api/useBarn';
import { useKontonummer } from './hooks/api/useKontonummer';
import SøknadRouter from './SøknadRouter';

interface SøknadAppProps {
    søker: Søker;
    deltakelsePeriode: DeltakelsePeriode;
}

const SøknadApp = ({ søker, deltakelsePeriode }: SøknadAppProps) => {
    const kontonummer = useKontonummer();
    const barn = useBarn();

    if (barn.isLoading || kontonummer.isLoading) {
        return <LoadingPage />;
    }

    if (barn.isError || kontonummer.isError) {
        const errorMessage = barn.isError ? 'Feil ved lasting av barn' : 'Feil ved lasting av kontonummer';
        return <HentDeltakerErrorPage error={errorMessage} />;
    }

    const kontonummerData = kontonummer.data?.harKontonummer ? kontonummer.data.kontonummer : undefined;

    return (
        <SøknadProvider
            søker={søker}
            deltakelsePeriode={deltakelsePeriode}
            kontonummer={kontonummerData}
            barn={barn.data || []}>
            <SøknadRouter />
        </SøknadProvider>
    );
};

export default SøknadApp;
