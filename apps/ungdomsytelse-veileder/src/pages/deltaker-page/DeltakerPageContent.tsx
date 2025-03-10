import { Alert, Box, HStack, VStack } from '@navikt/ds-react';
import LoadingSpinner from '@navikt/sif-common-core-ds/src/atoms/loading-spinner/LoadingSpinner';
import { useDeltaker } from '../../context/DeltakerContext';
import { DeltakelseProvider } from '../../context/DeltakelseContext';
import DeltakelseContent from '../../components/deltakelse-content/DeltakelseContent';

const DeltakerPageContent = () => {
    const { deltaker, deltakelserPending, deltakelser = [] } = useDeltaker();
    const aktiveDeltakelser = deltakelser;

    if (aktiveDeltakelser && aktiveDeltakelser.length > 1) {
        return (
            <VStack maxWidth={'30rem'}>
                <Alert variant="warning">Deltaker har flere aktive perioder</Alert>
            </VStack>
        );
    }
    if (!deltaker || deltakelserPending) {
        return (
            <HStack paddingBlock={'10'} paddingInline={'6'} justify="center">
                <LoadingSpinner size="3xlarge" />
            </HStack>
        );
    }

    if (!deltakelser) {
        return <Box>Ingen deltakelser funnet</Box>;
    }

    if (deltakelser.length === 0) {
        return <Box>Ingen deltakelse funnet</Box>;
    }
    if (deltakelser.length > 1) {
        return <Box>Kun en deltakelse støttes</Box>;
    }

    const deltakelse = deltakelser[0];

    return (
        <DeltakelseProvider deltakelse={deltakelse} deltaker={deltaker}>
            <DeltakelseContent />
        </DeltakelseProvider>
    );
};

export default DeltakerPageContent;
