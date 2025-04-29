import { LoadingPage } from '@navikt/sif-common-soknad-ds/src';
import InnsynApp from './apps/innsyn/InnsynApp';
import SøknadApp from './apps/søknad/SøknadApp';
import FlereDeltakelserPage from './components/pages/FlereDeltakelserPage';
import HentDeltakerErrorPage from './components/pages/HentDeltakerErrorPage';
import IngenDeltakelsePage from './components/pages/IngenDeltakelsePage';
import { DeltakerContextProvider } from './context/DeltakerContext';
import { useDeltakelser } from './hooks/useDeltakelser';
import { useSøker } from './hooks/useSøker';

const DeltakerInfoLoader = () => {
    const søker = useSøker();
    const deltakelser = useDeltakelser();

    const isLoading = søker.isLoading || deltakelser.isLoading;
    const error = søker.isError || deltakelser.isError;

    if (isLoading) {
        return <LoadingPage />;
    }

    if (error) {
        return <HentDeltakerErrorPage error="Feil ved lasting" />;
    }

    if (!deltakelser.data || !søker.data) {
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
        <DeltakerContextProvider søker={søker.data} deltakelse={deltakelse} refetchDeltakelser={deltakelser.refetch}>
            {deltakelse.harSøkt ? <InnsynApp /> : <SøknadApp />}
        </DeltakerContextProvider>
    );
};

export default DeltakerInfoLoader;
