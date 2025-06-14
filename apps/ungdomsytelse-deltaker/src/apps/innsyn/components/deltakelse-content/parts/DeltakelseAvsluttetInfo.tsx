import { BodyShort, Heading, VStack } from '@navikt/ds-react';

const DeltakelseAvsluttetInfo = () => {
    return (
        <VStack gap="4">
            <Heading level="2" size="medium">
                Deltakelsen din er avsluttet
            </Heading>
            <BodyShort>Ta kontakt med din veileder hvis du har noen spørsmål.</BodyShort>
        </VStack>
    );
};

export default DeltakelseAvsluttetInfo;
