import { Accordion, Alert, Heading, VStack } from '@navikt/ds-react';
import { useHentDeltakelser } from '../../../hooks/useHentDeltakelser';
import LoadingSpinner from '@navikt/sif-common-core-ds/src/atoms/loading-spinner/LoadingSpinner';
import DeltakelseTable from '../../../components/deltakelse-table/DeltakelseTable';
import MeldeUtDeltakerForm from '../forms/MeldeUtDeltakerForm';
import MeldeInnDeltakerPåNyttForm from '../forms/MeldeInnDeltakerPåNyttForm';
import EndreDeltakelseperiode from '../forms/EndreDeltakelseperiode';
import { useDeltaker } from '../context/DeltakerContext';
import { useEffectOnce } from '@navikt/sif-common-hooks';
import MeldeInnDeltakerForm from '../forms/MeldeInnDeltakerForm';

const RegistrertDeltaker = () => {
    const { deltaker } = useDeltaker();
    const { deltakelser, hentDeltakelserPending, hentDeltakelser } = useHentDeltakelser();

    useEffectOnce(() => {
        if (deltaker) {
            hentDeltakelser(deltaker.fødselsnummer);
        }
    });

    if (!deltaker) {
        return null;
    }

    return (
        <VStack gap="4" paddingBlock={'10'} paddingInline={'6'}>
            <>
                {hentDeltakelserPending || !deltaker ? (
                    <center>
                        <LoadingSpinner size="3xlarge" />
                    </center>
                ) : (
                    <>
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
                                                <MeldeUtDeltakerForm deltakerFnr={deltaker.fødselsnummer} />
                                            </Accordion.Content>
                                        </Accordion.Item>
                                        <Accordion.Item>
                                            <Accordion.Header>2. Melde inn deltaker på nytt</Accordion.Header>
                                            <Accordion.Content>
                                                <MeldeInnDeltakerPåNyttForm deltakerFnr={deltaker.fødselsnummer} />
                                            </Accordion.Content>
                                        </Accordion.Item>
                                        <Accordion.Item>
                                            <Accordion.Header>3. Endre eksisterende periode</Accordion.Header>
                                            <Accordion.Content>
                                                <EndreDeltakelseperiode
                                                    deltakelser={deltakelser}
                                                    deltakerFnr={deltaker.fødselsnummer}
                                                />
                                            </Accordion.Content>
                                        </Accordion.Item>
                                    </Accordion>
                                )}
                                {deltakelser.length === 0 && (
                                    <Accordion>
                                        <Accordion.Item>
                                            <Accordion.Header>1. Melde inn deltaker</Accordion.Header>
                                            <Accordion.Content>
                                                <MeldeInnDeltakerForm />
                                            </Accordion.Content>
                                        </Accordion.Item>
                                    </Accordion>
                                )}
                            </VStack>
                        ) : (
                            <>Ingen deltakelser funnet</>
                        )}
                    </>
                )}
            </>
        </VStack>
    );
};

export default RegistrertDeltaker;
