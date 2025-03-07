import { useParams } from 'react-router-dom';
import { DeltakerProvider } from '../../context/DeltakerContext';
import DeltakerPageHeader from './DeltakerPageHeader';
import DeltakerPageContent from './DeltakerPageContent';
import { Box, Page, VStack } from '@navikt/ds-react';

type DeltakerPageParams = {
    deltakerId: string;
};

const DeltakerPage = () => {
    const { deltakerId } = useParams<DeltakerPageParams>();

    return (
        <DeltakerProvider deltakerId={deltakerId}>
            <Page.Block width="xl" gutters={true}>
                <VStack>
                    <DeltakerPageHeader />
                    <Box className=" bg-white rounded-b-lg p-3 pr-6 pl-6">
                        <DeltakerPageContent />
                    </Box>
                </VStack>
            </Page.Block>
        </DeltakerProvider>
    );
};

export default DeltakerPage;
