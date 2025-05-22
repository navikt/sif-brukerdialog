import { LoadingPage } from '@navikt/sif-common-soknad-ds/src';
import { useDeltakelsePerioder } from '../../api/hooks/useDeltakelsePerioder';
import { useSøker } from '../../api/hooks/useSøker';
import InnsynApp from '../../apps/innsyn/InnsynApp';
import SøknadApp from '../../apps/søknad/SøknadApp';
import FlereDeltakelserPage from '../../pages/FlereDeltakelserPage';
import HentDeltakerErrorPage from '../../pages/HentDeltakerErrorPage';
import IngenDeltakelsePage from '../../pages/IngenDeltakelsePage';
import { DeltakerContextProvider } from '../../context/DeltakerContext';
import { useLocation } from 'react-router-dom';
import { Theme } from '@navikt/ds-react';

const DeltakerInfoLoader = () => {
    const søker = useSøker();
    const deltakelsePerioder = useDeltakelsePerioder();

    const isLoading = søker.isLoading || deltakelsePerioder.isLoading;
    const error = søker.isError || deltakelsePerioder.isError;
    const { pathname } = useLocation();

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
            {deltakelsePeriode.søktTidspunkt !== undefined && pathname.includes('kvittering') === false ? (
                <Theme hasBackground={false} className="bg-deepblue-50">
                    <InnsynApp />
                </Theme>
            ) : (
                <Theme>
                    <SøknadApp søker={søker.data} deltakelsePeriode={deltakelsePeriode} />
                </Theme>
            )}
        </DeltakerContextProvider>
    );
};

export default DeltakerInfoLoader;
