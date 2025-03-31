import { useParams } from 'react-router-dom';
import { DeltakerProvider, useDeltaker } from '../../context/DeltakerContext';
import DeltakerPageHeader from './DeltakerPageHeader';
import DeltakerPageContent from './DeltakerPageContent';
import { Box, HStack, Page, VStack } from '@navikt/ds-react';
import LoadingSpinner from '@navikt/sif-common-core-ds/src/atoms/loading-spinner/LoadingSpinner';

type DeltakerPageParams = {
    deltakerId: string;
};

const Content = () => {
    const { deltakelserPending } = useDeltaker();

    if (deltakelserPending) {
        return (
            <HStack paddingBlock={'10'} paddingInline={'6'} justify="center">
                <LoadingSpinner size="3xlarge" title="Henter deltaker" />
            </HStack>
        );
    }

    return (
        <Page.Block width="xl" gutters={true}>
            <VStack className="shadow-xl">
                <DeltakerPageHeader />
                <Box className="bg-white rounded-b-lg p-3 pr-6 pl-6">
                    <DeltakerPageContent />
                </Box>
            </VStack>
        </Page.Block>
    );
};

const DeltakerPage = () => {
    const { deltakerId } = useParams<DeltakerPageParams>();

    return (
        <DeltakerProvider deltakerId={deltakerId}>
            <Content />
        </DeltakerProvider>
    );
};

export default DeltakerPage;
