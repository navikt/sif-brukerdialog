import Page from '@navikt/sif-common-core-ds/lib/components/page/Page';
import React from 'react';
import { useSøknadContext } from '../../søknad/SøknadContext';

const VelkommenPage = () => {
    const { søker } = useSøknadContext();
    return <Page title="Velkommen">Velkommen {søker.fornavn}</Page>;
};

export default VelkommenPage;
