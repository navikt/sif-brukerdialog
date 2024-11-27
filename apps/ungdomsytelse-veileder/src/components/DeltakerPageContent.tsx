import { Accordion, Alert, Heading, HStack, VStack } from '@navikt/ds-react';
import LoadingSpinner from '@navikt/sif-common-core-ds/src/atoms/loading-spinner/LoadingSpinner';
import { useDeltaker } from '../context/DeltakerContext';
import EndreDeltakelseperiode from '../forms/EndreDeltakelseperiode';
import MeldeInnDeltakerPåNyttForm from '../forms/MeldeInnDeltakerPåNyttForm';
import MeldeUtDeltakerForm from '../forms/MeldeUtDeltakerForm';
import DeltakelseTable from './deltakelse-table/DeltakelseTable';

const DeltakerPageContent = () => {
    const { deltaker, deltakelser } = useDeltaker();

    if (!deltaker) {
        return (
            <HStack paddingBlock={'10'} paddingInline={'6'} justify="center">
                <LoadingSpinner size="3xlarge" />
            </HStack>
        );
    }

    return (
        <VStack gap="4" paddingBlock={'10'} paddingInline={'6'}>
            {deltakelser ? (
                <VStack gap="8">
                    <VStack gap="2">
                        <Heading level="2" size="medium">
                            Registrerte perioder
                        </Heading>
                        {deltakelser.length === 0 ? (
                            <Alert variant="info">Ingen deltakelser registrert</Alert>
                        ) : (
                            <DeltakelseTable deltakelser={deltakelser} />
                        )}
                    </VStack>
                    <Heading level="2" size="medium">
                        Handlinger
                    </Heading>
                    {deltakelser.length > 0 && (
                        <Accordion>
                            <Accordion.Item>
                                <Accordion.Header>1. Melde ut deltaker</Accordion.Header>
                                <Accordion.Content>
                                    <MeldeUtDeltakerForm deltakerId={deltaker.id} />
                                </Accordion.Content>
                            </Accordion.Item>
                            <Accordion.Item>
                                <Accordion.Header>2. Melde inn deltaker på nytt</Accordion.Header>
                                <Accordion.Content>
                                    <MeldeInnDeltakerPåNyttForm deltakerFnr={deltaker.deltakerIdent} />
                                </Accordion.Content>
                            </Accordion.Item>
                            <Accordion.Item>
                                <Accordion.Header>3. Endre eksisterende periode</Accordion.Header>
                                <Accordion.Content>
                                    <EndreDeltakelseperiode
                                        deltakelser={deltakelser}
                                        deltakerFnr={deltaker.deltakerIdent}
                                    />
                                </Accordion.Content>
                            </Accordion.Item>
                        </Accordion>
                    )}
                </VStack>
            ) : (
                <>Ingen deltakelser funnet</>
            )}
        </VStack>
    );
};

export default DeltakerPageContent;
