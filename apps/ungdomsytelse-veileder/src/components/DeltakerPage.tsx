import { useParams } from 'react-router-dom';
import { DeltakerProvider } from '../context/DeltakerContext';
import DeltakerPageHeader from './DeltakerPageHeader';
import DeltakerPageContent from './DeltakerPageContent';
import { Page, VStack } from '@navikt/ds-react';

type DeltakerPageParams = {
    deltakerId: string;
};

const DeltakerPage = () => {
    const { deltakerId } = useParams<DeltakerPageParams>();

    return (
        <DeltakerProvider deltakerId={deltakerId}>
            <Page.Block width="xl" gutters={true}>
                <VStack gap="4">
                    <DeltakerPageHeader />
                    <DeltakerPageContent />
                </VStack>
            </Page.Block>
        </DeltakerProvider>
    );
};

export default DeltakerPage;
