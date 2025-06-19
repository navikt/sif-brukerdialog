/* eslint-disable no-console */
import { useDeltakelsePerioder } from '../../api/hooks/useDeltakelsePerioder';
import { useSøker } from '../../api/hooks/useSøker';
import InnsynApp from '../../apps/innsyn/InnsynApp';
import SøknadApp from '../../apps/søknad/SøknadApp';
import FlereDeltakelserPage from '../../pages/FlereDeltakelserPage';
import HentDeltakerErrorPage from '../../pages/HentDeltakerErrorPage';
import IngenDeltakelsePage from '../../pages/IngenDeltakelsePage';
import { DeltakerContextProvider } from '../../context/DeltakerContext';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Oppgavetype } from '@navikt/ung-common';
import UngLoadingPage from '../../pages/UngLoadingPage';
import { AppRoutes } from '../../utils/AppRoutes';

const DeltakerInfoLoader = () => {
    const søker = useSøker();
    const deltakelsePerioder = useDeltakelsePerioder();

    const isLoading = søker.isLoading || deltakelsePerioder.isLoading;
    const error = søker.isError || deltakelsePerioder.isError;
    // const { pathname } = useLocation();

    if (isLoading) {
        return <UngLoadingPage />;
    }

    if (error) {
        console.error('Error loading data:', søker.error, deltakelsePerioder.error);
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

    /**
     * Applikasjonen støtter kun én deltakelse per bruker, så vi tar den første deltakelsen.
     */
    const deltakelsePeriode = deltakelsePerioder.data[0];

    const sendSøknadOppgave = deltakelsePeriode.oppgaver.find(
        (oppgave) => oppgave.oppgavetype === Oppgavetype.SØK_YTELSE,
    );

    const deltakerHarSøkt =
        deltakelsePeriode.søktTidspunkt !== undefined ||
        (deltakelsePeriode.oppgaver.length > 0 && sendSøknadOppgave === undefined);

    const aktivPathBasertPåDeltaker = deltakerHarSøkt ? AppRoutes.innsyn : AppRoutes.soknad;

    return (
        <DeltakerContextProvider
            søker={søker.data}
            deltakelsePeriode={deltakelsePeriode}
            refetchDeltakelser={deltakelsePerioder.refetch}>
            <Routes>
                <Route path={`${AppRoutes.soknad}/*`} element={<SøknadApp />} />
                <Route path={`${AppRoutes.innsyn}/*`} element={<InnsynApp />} />
                <Route path="*" element={<Navigate to={aktivPathBasertPåDeltaker} />} />
            </Routes>
        </DeltakerContextProvider>
    );
};

export default DeltakerInfoLoader;
