import { Accordion, Alert, Box, Heading, HStack, VStack } from '@navikt/ds-react';
import LoadingSpinner from '@navikt/sif-common-core-ds/src/atoms/loading-spinner/LoadingSpinner';
import { useDeltaker } from '../context/DeltakerContext';
import DeltakelseContent from './deltakelse-content/DeltakelseContent';
import NyDeltakelse from './ny-deltakelse/NyDeltakelse';
import DeltakelseHeader from './deltakelse-content/DeltakelseHeader';

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

    return (
        <Box className="rounded bg-gray-100 pb-10">
            <Box className=" p-3 pr-6 pl-6">
                <VStack gap="4" marginBlock="4 0">
                    <Heading level="2" size="medium">
                        Deltakelseperioder
                    </Heading>
                    <Accordion>
                        {deltakelser.map((deltakelse) => (
                            <Accordion.Item key={deltakelse.id}>
                                <Accordion.Header>
                                    <DeltakelseHeader deltakelse={deltakelse} />
                                </Accordion.Header>
                                <Accordion.Content>
                                    <DeltakelseContent
                                        key={deltakelse.id}
                                        deltakelse={deltakelse}
                                        deltaker={deltaker}
                                        alleDeltakelser={deltakelser}
                                        onChange={handleOnDeltakelseChange}
                                    />
                                </Accordion.Content>
                            </Accordion.Item>
                        ))}
                    </Accordion>

                    <NyDeltakelse
                        deltaker={deltaker}
                        alleDeltakelser={deltakelser}
                        onDeltakelseRegistrert={handleOnDeltakelseChange}
                    />
                </VStack>
            </Box>
        </Box>
    );
};

export default DeltakerPageContent;
