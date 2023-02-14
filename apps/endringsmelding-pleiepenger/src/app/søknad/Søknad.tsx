import { Alert } from '@navikt/ds-react';
import React from 'react';
import LoadingSpinner from '@navikt/sif-common-core-ds/lib/components/loading-spinner/LoadingSpinner';
import SifGuidePanel from '@navikt/sif-common-core-ds/lib/components/sif-guide-panel/SifGuidePanel';
import { getEnvironmentVariable } from '@navikt/sif-common-core-ds/lib/utils/envUtils';
import ErrorPage from '@navikt/sif-common-soknad-ds/lib/soknad-common-pages/ErrorPage';
import useSøknadInitialData from '../api/useSøknadInitialData';
import DevFooter from '../dev/DevFooter';
import IngenTilgangPage from '../pages/ingen-tilgang/IngenTilgangPage';
import { RequestStatus } from '../types/RequestStatus';
import { StepFormValuesContextProvider } from './context/StepFormValuesContext';
import { SøknadContextProvider } from './context/SøknadContext';
import SøknadRouter from './SøknadRouter';
import appSentryLogger from '../utils/appSentryLogger';

const Søknad = () => {
    const initialData = useSøknadInitialData();
    const { status } = initialData;

    if (status === RequestStatus.loading || status === RequestStatus.redirectingToLogin) {
        return <LoadingSpinner size="3xlarge" style="block" />;
    }

    if (status === RequestStatus.forbidden) {
        appSentryLogger.logError('requestStatus', RequestStatus.forbidden);
        return (
            <ErrorPage
                pageTitle="Ingen tilgang"
                contentRenderer={() => <Alert variant="error">Du har ikke tilgang til denne siden.</Alert>}
            />
        );
    }

    if (status === RequestStatus.error) {
        appSentryLogger.logError('requestStatus', initialData.error);
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
        return <IngenTilgangPage årsak={initialData.årsak} søker={initialData.søker} />;
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
