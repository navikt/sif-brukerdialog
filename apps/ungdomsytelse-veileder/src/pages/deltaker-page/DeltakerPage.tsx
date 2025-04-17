import { useParams } from 'react-router-dom';
import { DeltakerProvider } from '../../context/DeltakerContext';
import DeltakerPageHeader from './DeltakerPageHeader';
import DeltakerPageContent from './DeltakerPageContent';
import { Box, HStack, Page, VStack } from '@navikt/ds-react';
import LoadingSpinner from '@navikt/sif-common-core-ds/src/atoms/loading-spinner/LoadingSpinner';
import { useRegistrertDeltaker } from '../../hooks/useRegistrertDeltaker';
import { useDeltakelserForDeltaker } from '../../hooks/useDeltakelserForDeltaker';
import ErrorPageContent from '../error-page/ErrorPageContent';

type DeltakerPageParams = {
    deltakerId: string;
};

const DeltakerPage = () => {
    const { deltakerId } = useParams<DeltakerPageParams>();

    if (!deltakerId) {
        return <div>Ingen deltakerId</div>;
    }

    const {
        data: deltaker,
        isLoading: deltakerPending,
        error: deltakerError,
    } = useRegistrertDeltaker(deltakerId || '');

    const {
        data: deltakelser,
        isLoading: deltakelserPending,
        error: deltakelserError,
    } = useDeltakelserForDeltaker(deltakerId || '');

    if (deltakerPending || deltakelserPending) {
        return (
            <HStack paddingBlock={'10'} paddingInline={'6'} justify="center">
                <LoadingSpinner size="3xlarge" title="Henter deltaker" />
            </HStack>
        );
    }

    if (deltakelserError || deltakerError) {
        return (
            <Page.Block width="xl" gutters={true}>
                <Box className="bg-white rounded-b-lg p-3">
                    <ErrorPageContent error={deltakerError || deltakelserError} />
                </Box>
            </Page.Block>
        );
    }

    if (deltakelser && deltaker) {
        return (
            <DeltakerProvider deltaker={deltaker} deltakelser={deltakelser}>
                <Page.Block width="xl" gutters={true}>
                    <VStack className="rounded-lg">
                        <DeltakerPageHeader />
                        <Box className="bg-white rounded-b-lg p-3 pr-6 pl-6">
                            <DeltakerPageContent />
                        </Box>
                    </VStack>
                </Page.Block>
            </DeltakerProvider>
        );
    }
};

export default DeltakerPage;
