import { Heading } from '@navikt/ds-react';
import Page from '@navikt/sif-common-core-ds/lib/components/page/Page';
import React from 'react';
import { useSøknadContext } from '../../søknad/context/hooks/useSøknadContext';

const VelkommenPage = () => {
    const {
        state: { søker },
    } = useSøknadContext();
    return (
        <Page title="Velkommen">
            <Heading level="1" size="large">
                Velkommen {søker.fornavn}
            </Heading>
        </Page>
    );
};

export default VelkommenPage;
