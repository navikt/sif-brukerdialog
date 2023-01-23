import React from 'react';
import LoadingSpinner from '@navikt/sif-common-core-ds/lib/components/loading-spinner/LoadingSpinner';
import ErrorPage from '@navikt/sif-common-soknad-ds/lib/soknad-common-pages/ErrorPage';
import useSøknadInitialData from '../api/useSøknadInitialData';
import { StepFormValuesContextProvider } from './context/StepFormValuesContext';
import { SøknadContextProvider } from './context/SøknadContext';
import SøknadRouter from './SøknadRouter';

const Søknad = () => {
    const initialData = useSøknadInitialData();
    const { status } = initialData;

    /** Loading */
    if (status === 'loading') {
        return <LoadingSpinner size="3xlarge" style="block" />;
    }
    /** Error */
    if (status === 'error') {
        return (
            <ErrorPage
                pageTitle="Det oppstod en feil"
                contentRenderer={() => (
                    <p>Det oppstod en feil under oppstartet av søknaden. Vennligst prøv igjen senere.</p>
                )}
            />
        );
    }

    /** Success */
    const { data } = initialData;

    return (
        <SøknadContextProvider initialData={data}>
            <StepFormValuesContextProvider>
                <SøknadRouter />
            </StepFormValuesContextProvider>
        </SøknadContextProvider>
    );
};

export default Søknad;
