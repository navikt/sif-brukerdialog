import HentDeltakerErrorPage from './components/pages/HentDeltakerErrorPage';
import { LoadingPage } from '@navikt/sif-common-soknad-ds/src';
import InnsynApp from './apps/innsyn/InnsynApp';
import SøknadApp from './apps/søknad/SøknadApp';
import { DeltakerContextProvider } from './context/DeltakerContext';
import FlereDeltakelserPage from './components/pages/FlereDeltakelserPage';
import IngenDeltakelsePage from './components/pages/IngenDeltakelsePage';
import { useSøker } from './hooks/useSøker';
import { useKontonummer } from './hooks/useKontonummer';
import { useDeltakelser } from './hooks/useDeltakelser';
import { useBarn } from './hooks/useBarn';

const DeltakerInfoLoader = () => {
    const søker = useSøker();
    const kontonummer = useKontonummer();
    const deltakelser = useDeltakelser();
    const barn = useBarn();

    const isLoading = søker.isLoading || deltakelser.isLoading || barn.isLoading || kontonummer.isLoading;
    const error = søker.isError || deltakelser.isError || barn.isError;

    if (isLoading) {
        return <LoadingPage />;
    }

    if (error) {
        return <HentDeltakerErrorPage error="Feil ved lasting" />;
    }

    if (!deltakelser.data || !søker.data || !barn.data) {
        return <HentDeltakerErrorPage error="Ingen data lastet" />;
    }

    if (deltakelser.data.length === 0) {
        return <IngenDeltakelsePage />;
    }

    if (deltakelser.data.length > 1) {
        return <FlereDeltakelserPage />;
    }

    const deltakelse = deltakelser.data[0];

    return (
        <DeltakerContextProvider
            kontonummer={kontonummer.isError ? undefined : kontonummer.data?.kontonummer}
            søker={søker.data}
            deltakelse={deltakelse}
            barn={barn.data}
            refetchDeltakelser={deltakelser.refetch}>
            {deltakelse.harSøkt ? <InnsynApp /> : <SøknadApp />}
        </DeltakerContextProvider>
    );
};

export default DeltakerInfoLoader;
