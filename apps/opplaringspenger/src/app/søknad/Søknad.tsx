import React from 'react';
// import { Link } from 'react-router-dom';
import LoadingSpinner from '@navikt/sif-common-core-ds/lib/components/loading-spinner/LoadingSpinner';
import ErrorPage from '@navikt/sif-common-soknad-ds/lib/soknad-common-pages/ErrorPage';
import useSøknadInitialData from '../api/useSøknadInitialData';
import SøknadContextProvider from './context/SøknadContext';
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
        return <ErrorPage pageTitle="Det oppstod en feil" contentRenderer={() => <p>Dette er feilmeldingen</p>} />;
    }

    /** Success */
    const { data } = initialData;

    return (
        <SøknadContextProvider initialData={data}>
            <SøknadRouter />
        </SøknadContextProvider>
    );
};

export default Søknad;
