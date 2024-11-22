import { Accordion, Heading, VStack } from '@navikt/ds-react';
import MeldeInnDeltakerForm from './forms/MeldeInnDeltakerForm';
const NyDeltaker = () => {
    return (
        <VStack gap="4">
            <Heading level="2" size="medium">
                Ny deltaker
            </Heading>
            <Accordion>
                <Accordion.Item>
                    <Accordion.Header>1. Melde inn deltaker</Accordion.Header>
                    <Accordion.Content>
                        <MeldeInnDeltakerForm />
                    </Accordion.Content>
                </Accordion.Item>
            </Accordion>
        </VStack>
    );
};

export default NyDeltaker;
