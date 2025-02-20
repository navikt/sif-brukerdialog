import { Alert, Box, HStack, VStack } from '@navikt/ds-react';
import LoadingSpinner from '@navikt/sif-common-core-ds/src/atoms/loading-spinner/LoadingSpinner';
import { useDeltaker } from '../context/DeltakerContext';
import DeltakelseContent from './deltakelse-content/DeltakelseContent';
import NyDeltakelse from './ny-deltakelse/NyDeltakelse';
import DeltakelseHeader from './deltakelse-content/DeltakelseHeader';

const kanOppretteNyDeltakelse = false;

const DeltakerPageContent = () => {
    const { deltaker, deltakelser = [], refetchDeltakelser } = useDeltaker();
    const aktiveDeltakelser = deltakelser?.filter((d) => d.erAktiv);

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
    if (!deltaker) {
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
        <Box className="rounded bg-white">
            <DeltakelseHeader deltakelse={deltakelse} />
            <Box className=" p-3 pr-6 pl-6">
                <DeltakelseContent
                    key={deltakelse.id}
                    deltakelse={deltakelse}
                    deltaker={deltaker}
                    alleDeltakelser={deltakelser}
                    onChange={handleOnDeltakelseChange}
                />

                {kanOppretteNyDeltakelse ? (
                    <NyDeltakelse
                        deltaker={deltaker}
                        alleDeltakelser={deltakelser}
                        onDeltakelseRegistrert={handleOnDeltakelseChange}
                    />
                ) : null}
            </Box>
        </Box>
    );
};

export default DeltakerPageContent;
