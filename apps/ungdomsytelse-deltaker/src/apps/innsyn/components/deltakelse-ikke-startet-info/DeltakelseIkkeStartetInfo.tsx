import { BodyLong, Heading, VStack } from '@navikt/ds-react';
import InnsynBlueBox from '../innsyn-blue-box/InnsynBlueBox';

const DeltakelseIkkeStartetInfo = () => {
    return (
        <InnsynBlueBox>
            <VStack gap="4">
                <Heading level="2" size="medium">
                    Deltakelsen ikke startet
                </Heading>
                <BodyLong>
                    Hva skal vi kommunisere til deltaker når deltakelsen ikke er startet enda? Trengs denne siden
                    egentlig, eller holder det men vanlig visning?
                </BodyLong>
            </VStack>
        </InnsynBlueBox>
    );
};

export default DeltakelseIkkeStartetInfo;
