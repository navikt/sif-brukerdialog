import React from 'react';
import LoadingSpinner from '@navikt/sif-common-core-ds/lib/components/loading-spinner/LoadingSpinner';
import ErrorPage from '@navikt/sif-common-soknad-ds/lib/soknad-common-pages/ErrorPage';
import useSøknadInitialData from '../api/useSøknadInitialData';
import IngenTilgangPage from '../pages/ingen-tilgang/IngenTilgangPage';
import { RequestStatus } from '../types/RequestStatus';
import { StepFormValuesContextProvider } from './context/StepFormValuesContext';
import { SøknadContextProvider } from './context/SøknadContext';
import SøknadRouter from './SøknadRouter';
import { Alert } from '@navikt/ds-react';

const Søknad = () => {
    const initialData = useSøknadInitialData();
    const { status } = initialData;

    if (status === RequestStatus.loading) {
        return <LoadingSpinner size="3xlarge" style="block" />;
    }

    if (status === RequestStatus.noAccess) {
        return <IngenTilgangPage årsak={initialData.reason} />;
    }

    if (status === RequestStatus.error) {
        return (
            <ErrorPage
                pageTitle="Det oppstod en feil"
                contentRenderer={() => (
                    <Alert variant="error">
                        Det oppstod en feil under henting av informasjon. Vennligst prøv igjen senere.
                    </Alert>
                )}
            />
        );
    }

    return (
        <SøknadContextProvider initialData={initialData.data}>
            <StepFormValuesContextProvider>
                <SøknadRouter />
            </StepFormValuesContextProvider>
        </SøknadContextProvider>
    );
};

export default Søknad;
