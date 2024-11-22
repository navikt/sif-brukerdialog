import { Accordion, Box, Heading, VStack } from '@navikt/ds-react';
import VelgDeltaker from '../../components/velg-deltaker/VelgDeltaker';
import { useState } from 'react';
import { useHentDeltakelser } from '../../hooks/useHentDeltakelser';
import { useEffectOnce } from '@navikt/sif-common-hooks';
import LoadingSpinner from '@navikt/sif-common-core-ds/src/atoms/loading-spinner/LoadingSpinner';
import DeltakelseTable from '../../components/deltakelse-table/DeltakelseTable';
import MeldeUtDeltakerForm from './forms/MeldeUtDeltakerForm';
import MeldeInnDeltakerPåNyttForm from './forms/MeldeInnDeltakerPåNyttForm';
import EndreDeltakelseperiode from './forms/EndreDeltakelseperiode';

const RegistrertDeltaker = () => {
    const [deltakerFnr, setDeltakerFnr] = useState<string | undefined>('56857102105');
    const { hentDeltakelser, deltakelser, hentDeltakelserPending } = useHentDeltakelser();

    useEffectOnce(() => {
        if (deltakerFnr) {
            hentDeltakelser(deltakerFnr);
        }
    });

    const handleDeltakerValgt = (fnr: string) => {
        setDeltakerFnr(fnr);
        if (fnr) {
            hentDeltakelser(fnr);
        }
    };

    return (
        <VStack gap="4">
            <Box padding="4" className="bg-bg-subtle rounded">
                <VelgDeltaker onDeltakerValgt={handleDeltakerValgt} valgtFnr={deltakerFnr} />
            </Box>
            {deltakerFnr && (
                <>
                    {hentDeltakelserPending ? (
                        <center>
                            <LoadingSpinner size="3xlarge" />
                        </center>
                    ) : (
                        <>
                            {deltakelser ? (
                                <VStack gap="8">
                                    <VStack gap="2">
                                        <Heading level="2" size="medium">
                                            Perioder
                                        </Heading>
                                        <DeltakelseTable deltakelser={deltakelser} />
                                    </VStack>
                                    <Heading level="2" size="medium">
                                        Handlinger
                                    </Heading>
                                    <Accordion>
                                        <Accordion.Item>
                                            <Accordion.Header>1. Melde ut deltaker</Accordion.Header>
                                            <Accordion.Content>
                                                <MeldeUtDeltakerForm deltakerFnr={deltakerFnr} />
                                            </Accordion.Content>
                                        </Accordion.Item>
                                        <Accordion.Item>
                                            <Accordion.Header>2. Melde inn deltaker på nytt</Accordion.Header>
                                            <Accordion.Content>
                                                <MeldeInnDeltakerPåNyttForm deltakerFnr={deltakerFnr} />
                                            </Accordion.Content>
                                        </Accordion.Item>
                                        <Accordion.Item>
                                            <Accordion.Header>3. Endre eksisterende periode</Accordion.Header>
                                            <Accordion.Content>
                                                <EndreDeltakelseperiode
                                                    deltakelser={deltakelser}
                                                    deltakerFnr={deltakerFnr}
                                                />
                                            </Accordion.Content>
                                        </Accordion.Item>
                                    </Accordion>
                                </VStack>
                            ) : (
                                <>Ingen deltakelser funnet</>
                            )}
                        </>
                    )}
                </>
            )}
        </VStack>
    );
};

export default RegistrertDeltaker;
