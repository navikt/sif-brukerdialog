import { LoadingPage } from '@navikt/sif-common-soknad-ds/src';

import { useSøker } from './api/hooks/useSøker';
import InnsynApp from './apps/innsyn/InnsynApp';
import SøknadApp from './apps/søknad/SøknadApp';
import FlereDeltakelserPage from './components/pages/FlereDeltakelserPage';
import HentDeltakerErrorPage from './components/pages/HentDeltakerErrorPage';
import IngenDeltakelsePage from './components/pages/IngenDeltakelsePage';
import { DeltakerContextProvider } from './context/DeltakerContext';
import { useDeltakelsePerioder } from './api/hooks/useDeltakelsePerioder';

const DeltakerInfoLoader = () => {
    const søker = useSøker();
    const deltakelsePerioder = useDeltakelsePerioder();

    const isLoading = søker.isLoading || deltakelsePerioder.isLoading;
    const error = søker.isError || deltakelsePerioder.isError;

    if (isLoading) {
        return <LoadingPage />;
    }

    if (error) {
        return <HentDeltakerErrorPage error="Feil ved lasting" />;
    }

    if (!deltakelsePerioder.data || !søker.data) {
        return <HentDeltakerErrorPage error="Ingen data lastet" />;
    }

    if (deltakelsePerioder.data.length === 0) {
        return <IngenDeltakelsePage />;
    }

    if (deltakelsePerioder.data.length > 1) {
        return <FlereDeltakelserPage />;
    }

    const deltakelsePeriode = deltakelsePerioder.data[0];

    return (
        <DeltakerContextProvider
            søker={søker.data}
            deltakelsePeriode={deltakelsePeriode}
            refetchDeltakelser={deltakelsePerioder.refetch}>
            {deltakelsePeriode.harSøkt ? (
                <InnsynApp />
            ) : (
                <SøknadApp søker={søker.data} deltakelsePeriode={deltakelsePeriode} />
            )}
        </DeltakerContextProvider>
    );
};

export default DeltakerInfoLoader;
