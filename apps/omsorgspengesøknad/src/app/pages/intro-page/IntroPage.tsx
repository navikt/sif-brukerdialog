import React from 'react';
import { Link } from 'react-router-dom';
import Page from '@navikt/sif-common-core-ds/lib/components/page/Page';
import { SøknadRoutes } from '../../types/SøknadRoutes';
import { Heading, Ingress } from '@navikt/ds-react';

const IntroPage = () => {
    return (
        <Page title="Introside">
            <Heading level="1" size="large">
                Søknad om omsorgspengesoknad
            </Heading>
            <>
                <Ingress>Introduksjonsside</Ingress>
                <p>
                    <Link to={SøknadRoutes.VELKOMMEN}>Gå til søknad</Link>
                </p>
            </>
        </Page>
    );
};

export default IntroPage;
