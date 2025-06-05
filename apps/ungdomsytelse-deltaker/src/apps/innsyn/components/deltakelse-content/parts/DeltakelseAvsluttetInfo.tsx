import { BodyLong, Heading, VStack } from '@navikt/ds-react';
import InnsynBlueBox from '../../../atoms/innsyn-blue-box/InnsynBlueBox';

const DeltakelseAvsluttetInfo = () => {
    return (
        <InnsynBlueBox>
            <VStack gap="4">
                <Heading level="2" size="medium">
                    Deltakelsen din er nå avsluttet
                </Heading>
                <BodyLong>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec a diam lectus. Sed sit amet ipsum
                    mauris. Maecenas congue ligula ac quam viverra nec consectetur ante hendrerit. Donec et mollis
                    dolor.
                </BodyLong>
                <BodyLong>
                    Praesent et diam eget libero egestas mattis sit amet vitae augue. Nam tincidunt congue enim, ut
                    porta lorem lacinia consectetur. Donec lacus nunc, viverra nec blandit vel, egestas et augue.
                    Aliquam erat volutpat.
                </BodyLong>
            </VStack>
        </InnsynBlueBox>
    );
};

export default DeltakelseAvsluttetInfo;
