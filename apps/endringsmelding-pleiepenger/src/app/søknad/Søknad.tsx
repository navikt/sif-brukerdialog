import { Alert } from '@navikt/ds-react';
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import LoadingSpinner from '@navikt/sif-common-core-ds/lib/atoms/loading-spinner/LoadingSpinner';
import SifGuidePanel from '@navikt/sif-common-core-ds/lib/components/sif-guide-panel/SifGuidePanel';
import { getEnvironmentVariable } from '@navikt/sif-common-core-ds/lib/utils/envUtils';
import ErrorPage from '@navikt/sif-common-soknad-ds/lib/soknad-common-pages/ErrorPage';
import useSøknadInitialData from '../hooks/useSøknadInitialData';
import DevFooter from '../dev/DevFooter';
import IngenTilgangPage from '../pages/ingen-tilgang/IngenTilgangPage';
import { RequestStatus } from '../types/RequestStatus';
import appSentryLogger from '../utils/appSentryLogger';
import { SøknadRoutes } from './config/SøknadRoutes';
import { StepFormValuesContextProvider } from './context/StepFormValuesContext';
import { SøknadContextProvider } from './context/SøknadContext';
import SøknadRouter from './SøknadRouter';

const Søknad = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const initialData = useSøknadInitialData();
    const { status } = initialData;

    if (status === RequestStatus.loading || status === RequestStatus.redirectingToLogin) {
        return <LoadingSpinner size="3xlarge" style="block" />;
    }

    if (status === RequestStatus.forbidden) {
        appSentryLogger.logError('Søknad.requestStatus', RequestStatus.forbidden);
        return (
            <ErrorPage
                pageTitle="Ingen tilgang"
                contentRenderer={() => <Alert variant="error">Du har ikke tilgang til denne siden.</Alert>}
            />
        );
    }

    if (status === RequestStatus.error) {
        appSentryLogger.logError('Søknad.requestStatus', initialData.error);
        return (
            <ErrorPage
                pageTitle="Det oppstod en feil"
                contentRenderer={() => (
                    <SifGuidePanel mood="uncertain">
                        Det oppstod en feil under henting av informasjon. Vennligst prøv igjen litt senere.
                    </SifGuidePanel>
                )}
            />
        );
    }

    const { kanBrukeSøknad } = initialData;

    if (kanBrukeSøknad === false) {
        if (location.pathname === SøknadRoutes.IKKE_TILGANG) {
            return <IngenTilgangPage årsak={initialData.årsak} søker={initialData.søker} />;
        }
        setTimeout(() => {
            navigate(SøknadRoutes.IKKE_TILGANG);
        });
        return null;
    }
    return (
        <SøknadContextProvider initialData={initialData.data}>
            <StepFormValuesContextProvider>
                <SøknadRouter />
                {getEnvironmentVariable('MSW') === 'on' && <DevFooter />}
            </StepFormValuesContextProvider>
        </SøknadContextProvider>
    );
};
export default Søknad;
