import React from 'react';
import LoadingSpinner from '@navikt/sif-common-core-ds/lib/components/loading-spinner/LoadingSpinner';
import ErrorPage from '@navikt/sif-common-soknad-ds/lib/soknad-common-pages/ErrorPage';
import useSøknadInitialData, { SøknadInitialData } from '../api/useSøknadInitialData';
import { SøknadContextState } from '../types/SøknadContextState';
import { SøknadsdataContextProvider } from './SøknadContext';
import SøknadRoutes from './SøknadRoutes';
import { Link } from 'react-router-dom';

const getInitialSøknadContext = (data: SøknadInitialData): SøknadContextState => {
    return { barn: data.registrerteBarn, søker: data.søker };
};

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
        <SøknadsdataContextProvider
            value={{
                ...getInitialSøknadContext(data),
            }}>
            <Link to="velkommen">Velkommen</Link>
            <Link to="barn">Barn</Link>
            <Link to="arbeid">Arbeid</Link>
            <Link to="oppsummering">Oppsummering</Link>
            <SøknadRoutes />
        </SøknadsdataContextProvider>
    );
};

export default Søknad;
