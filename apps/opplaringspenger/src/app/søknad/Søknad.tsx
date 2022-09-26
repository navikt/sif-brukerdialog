import React from 'react';
import useSøknadInitialData from '../api/useSøknadInitialData';

const Søknad = () => {
    const initialData = useSøknadInitialData();
    const { status } = initialData;

    if (status === 'loading') {
        return <>Loading</>;
    }

    if (status === 'error') {
        return <>Error</>;
    }

    const { data } = initialData;

    return <>Hei {data.søker.fornavn}</>;
};

export default Søknad;
