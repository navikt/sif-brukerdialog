import React from 'react';
import LoadingSpinner from '@navikt/sif-common-core-ds/lib/components/loading-spinner/LoadingSpinner';
import Page from '@navikt/sif-common-core-ds/lib/components/page/Page';
import useSøknadInitialData from '../api/useSøknadInitialData';

const Søknad = () => {
    const initialData = useSøknadInitialData();
    const { status } = initialData;

    if (status === 'loading') {
        return <LoadingSpinner size="3xlarge" style="block" />;
    }

    if (status === 'error') {
        return <>Error</>;
    }

    const { data } = initialData;

    return <Page title="Whoa">Hei {data.søker.fornavn}</Page>;
};

export default Søknad;
