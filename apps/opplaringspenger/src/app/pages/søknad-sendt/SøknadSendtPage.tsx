import { Heading, Ingress } from '@navikt/ds-react';
import React from 'react';
import Page from '@navikt/sif-common-core-ds/lib/components/page/Page';

const SøknadSendtPage = () => {
    return (
        <Page title="Søknad er mottatt">
            <Heading level="1" size="large">
                Søknad er mottatt
            </Heading>
            <>
                <Ingress>Oppsummeringstekst</Ingress>
            </>
        </Page>
    );
};

export default SøknadSendtPage;
