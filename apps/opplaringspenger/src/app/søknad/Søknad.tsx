import React from 'react';
import { Link } from 'react-router-dom';
import LoadingSpinner from '@navikt/sif-common-core-ds/lib/components/loading-spinner/LoadingSpinner';
import ErrorPage from '@navikt/sif-common-soknad-ds/lib/soknad-common-pages/ErrorPage';
import useSøknadInitialData from '../api/useSøknadInitialData';
import SøknadContextProvider from './context/SøknadContext';
import SøknadRoutes from './SøknadRoutes';

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
            <Link to="velkommen">Velkommen</Link>
            <Link to="barn">Barn</Link>
            <Link to="arbeid">Arbeid</Link>
            <Link to="oppsummering">Oppsummering</Link>
            <SøknadRoutes />
        </SøknadContextProvider>
    );
};

export default Søknad;
