import type { NextPage } from 'next';
import { BodyShort, GuidePanel, Heading, VStack } from '@navikt/ds-react';
import Head from 'next/head';
import EmptyPage from '../components/page-layout/empty-page/EmptyPage';
import { useLogSidevisning } from '@navikt/sif-common-amplitude';
import { PageKey } from '../types/PageKey';
import { ApplicationState } from '@navikt/appstatus-react-ds/src/hooks/useGetApplicationStatus';
import { StatusMessage } from '@navikt/appstatus-react-ds';

interface Props {
    appStatus: ApplicationState;
}
const UnavailablePage: NextPage = ({ appStatus }: Props) => {
    useLogSidevisning(PageKey.utilgjengelig);
    return (
        <EmptyPage>
            <VStack gap="8">
                {appStatus?.message && (
                    <div className="max-w-[1128px] mx-auto p-5 mb-5">
                        <StatusMessage message={appStatus.message} />
                    </div>
                )}
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
            </VStack>
        </EmptyPage>
    );
};

export default UnavailablePage;
