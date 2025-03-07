import { Alert, Box, HStack, VStack } from '@navikt/ds-react';
import LoadingSpinner from '@navikt/sif-common-core-ds/src/atoms/loading-spinner/LoadingSpinner';
import { useDeltaker } from '../../context/DeltakerContext';
import DeltakelseContent from '../../components/deltakelse-content/DeltakelseContent';

const DeltakerPageContent = () => {
    const { deltaker, deltakelserPending, deltakelser = [], refetchDeltakelser } = useDeltaker();
    const aktiveDeltakelser = deltakelser;

    const handleOnDeltakelseChange = () => {
        refetchDeltakelser();
    };

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
        <DeltakelseContent
            key={deltakelse.id}
            deltakelse={deltakelse}
            deltaker={deltaker}
            alleDeltakelser={deltakelser}
            onChange={handleOnDeltakelseChange}
        />
    );
};

export default DeltakerPageContent;
