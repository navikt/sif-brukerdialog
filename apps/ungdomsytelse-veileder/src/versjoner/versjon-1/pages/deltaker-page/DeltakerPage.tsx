import { useParams } from 'react-router-dom';
import { DeltakerProvider } from '../../../../context/DeltakerContext';
import DeltakerPageHeader from '../../../../components/DeltakerPageHeader';
import DeltakerPageContent from '../../../../components/DeltakerPageContent';
import { VStack } from '@navikt/ds-react';

type DeltakerPageParams = {
    deltakerId: string;
};

const DeltakerPage = () => {
    const { deltakerId } = useParams<DeltakerPageParams>();

    return (
        <DeltakerProvider deltakerId={deltakerId}>
            <VStack gap="4">
                <DeltakerPageHeader />
                <DeltakerPageContent />
            </VStack>
        </DeltakerProvider>
    );
};

export default DeltakerPage;
