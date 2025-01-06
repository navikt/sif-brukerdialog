import { Alert, Box, HStack, Page, VStack } from '@navikt/ds-react';
import LoadingSpinner from '@navikt/sif-common-core-ds/src/atoms/loading-spinner/LoadingSpinner';
import { useDeltaker } from '../context/DeltakerContext';
import DeltakelseContent from './deltakelse-content/DeltakelseContent';

const DeltakerPageContent = () => {
    const { deltaker, deltakelser = [], refetchDeltakelser } = useDeltaker();
    // const aktivDeltakelse = deltakelser?.find((d) => d.erAktiv);
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

    return (
        <Page.Block width="xl" gutters={true}>
            <VStack gap="4">
                {deltakelser.map((deltakelse) => (
                    <DeltakelseContent
                        key={deltakelse.id}
                        deltakelse={deltakelse}
                        deltaker={deltaker}
                        alleDeltakelser={deltakelser}
                        onChange={handleOnDeltakelseChange}
                    />
                ))}
            </VStack>
        </Page.Block>
    );
};

export default DeltakerPageContent;
