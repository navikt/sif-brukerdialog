import type { NextPage } from 'next';
import { BodyShort, GuidePanel, Heading } from '@navikt/ds-react';
import Head from 'next/head';
import EmptyPage from '../components/page-layout/empty-page/EmptyPage';

const UnavailablePage: NextPage = () => {
    return (
        <EmptyPage>
            <GuidePanel poster={true} className="sm:max-w-lg m-auto">
                <Head>
                    <title>Ikke tilgjengelig for øyeblikket - Dine pleiepenger</title>
                </Head>
                <Heading level="1" size="large" spacing={true}>
                    Ikke tilgjengelig
                </Heading>
                <BodyShort size="large" spacing={true}>
                    Dine pleiepenger er ikke tilgjengelig for øyeblikket.
                </BodyShort>
                <BodyShort size="large">Vennligst prøv igjen litt senere.</BodyShort>
            </GuidePanel>
        </EmptyPage>
    );
};

export default UnavailablePage;
