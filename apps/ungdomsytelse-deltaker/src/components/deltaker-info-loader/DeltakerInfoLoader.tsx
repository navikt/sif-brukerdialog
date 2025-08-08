import { Navigate, Route, Routes, useParams } from 'react-router-dom';
import { Oppgavetype } from '@navikt/ung-deltakelse-opplyser-api-deltaker';
import { ApiError, ApplikasjonHendelse, useAnalyticsInstance } from '../../analytics/analytics';
import { useDeltakelsePerioder } from '../../api/hooks/useDeltakelsePerioder';
import { useSøker } from '../../api/hooks/useSøker';
import AppRouter from '../../AppRouter';
import InnsynApp from '../../apps/innsyn/InnsynApp';
import SøknadApp from '../../apps/søknad/SøknadApp';
import { DeltakerContextProvider } from '../../context/DeltakerContext';
import FlereDeltakelserPage from '../../pages/FlereDeltakelserPage';
import HentDeltakerErrorPage from '../../pages/HentDeltakerErrorPage';
import IngenDeltakelsePage from '../../pages/IngenDeltakelsePage';
import UngLoadingPage from '../../pages/UngLoadingPage';
import { AppRoutes } from '../../utils/AppRoutes';
import { logFaroError } from '../../utils/faroUtils';

const DeltakerInfoLoader = () => {
    const søker = useSøker();
    const deltakelsePerioder = useDeltakelsePerioder();

    const isLoading = søker.isLoading || deltakelsePerioder.isLoading;
    const error = søker.isError || deltakelsePerioder.isError;
    const { logApiError, logHendelse } = useAnalyticsInstance();

    if (isLoading) {
        return <UngLoadingPage />;
    }

    if (error) {
        logApiError(ApiError.oppstartsinfo, { søker: søker.error, deltakelsePerioder: deltakelsePerioder.error });
        logFaroError('DeltakerInfoLoader.Error', { søker: søker.error, deltakelsePerioder: deltakelsePerioder.error });
        return <HentDeltakerErrorPage error="Feil ved lasting" />;
    }

    if (!deltakelsePerioder.data || !søker.data) {
        logApiError(ApiError.oppstartsinfo, { info: 'Ingen data lastet' });
        logFaroError('DeltakerInfoLoader.ManglendeData', {
            søker: søker.error,
            deltakelsePerioder: deltakelsePerioder.error,
        });
        return <HentDeltakerErrorPage error="Ingen data lastet" />;
    }

    if (deltakelsePerioder.data.length === 0) {
        logHendelse(ApplikasjonHendelse.erIkkeDeltaker);
        return <IngenDeltakelsePage />;
    }

    if (deltakelsePerioder.data.length > 1) {
        logHendelse(ApplikasjonHendelse.harFlereDeltakelser);
        logFaroError('DeltakerInfoLoader.FlereDeltakelser', {
            søker: søker.error,
            deltakelsePerioder: deltakelsePerioder.error,
        });
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

    const OppgaveRedirect = () => {
        const { oppgaveReferanse } = useParams<{ oppgaveReferanse: string }>();
        return <Navigate to={`${AppRoutes.innsyn}/oppgave/${oppgaveReferanse}`} replace />;
    };

    return (
        <DeltakerContextProvider
            søker={søker.data}
            deltakelsePeriode={deltakelsePeriode}
            refetchDeltakelser={deltakelsePerioder.refetch}>
            <AppRouter>
                <Routes>
                    <Route path={`${AppRoutes.soknad}/*`} element={<SøknadApp />} />
                    <Route path={`${AppRoutes.innsyn}/*`} element={<InnsynApp />} />
                    {/* Fallback for tidligere routes */}
                    <Route path="oppgave/:oppgaveReferanse" element={<OppgaveRedirect />} />
                    {/* Fallback for andre routes */}
                    <Route path="*" element={<Navigate to={aktivPathBasertPåDeltaker} />} />
                </Routes>
            </AppRouter>
        </DeltakerContextProvider>
    );
};

export default DeltakerInfoLoader;
