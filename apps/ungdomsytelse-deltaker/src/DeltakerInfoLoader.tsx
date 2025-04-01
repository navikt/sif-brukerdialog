import HentDeltakerErrorPage from './components/pages/HentDeltakerErrorPage';
import { LoadingPage } from '@navikt/sif-common-soknad-ds/src';
import InnsynApp from './apps/innsyn/InnsynApp';
import SøknadApp from './apps/søknad/SøknadApp';
import { DeltakerContextProvider } from './context/DeltakerContext';
import FlereDeltakelserPage from './components/pages/FlereDeltakelserPage';
import IngenDeltakelsePage from './components/pages/IngenDeltakelsePage';
import { useQuery } from '@tanstack/react-query';
import { fetchBarn, fetchSøker, RegistrertBarn, Søker } from '@navikt/sif-common-api';
import { deltakerApiService } from './api/deltakerApiService';
import { DeltakelsePeriode } from '@navikt/ung-common';

const DeltakerInfoLoader = () => {
    const søker = useQuery<Søker>({
        queryKey: ['søker'],
        queryFn: fetchSøker,
    });

    const deltakelser = useQuery<DeltakelsePeriode[]>({
        queryKey: ['deltakelser'],
        queryFn: deltakerApiService.getAlleMineDeltakelser,
    });

    const barn = useQuery<RegistrertBarn[]>({
        queryKey: ['deltakelser'],
        queryFn: fetchBarn,
    });

    const isLoading = søker.isLoading || deltakelser.isLoading || barn.isLoading;
    const error = søker.isError || deltakelser.isError || barn.isError;

    if (isLoading) {
        return <LoadingPage />;
    }

    if (error) {
        return <HentDeltakerErrorPage error={'Feil ved lasting'} />;
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
        <DeltakerContextProvider søker={søker.data} deltakelse={deltakelse} barn={barn.data}>
            {deltakelse.harSøkt ? <InnsynApp /> : <SøknadApp />}
        </DeltakerContextProvider>
    );
};

export default DeltakerInfoLoader;
