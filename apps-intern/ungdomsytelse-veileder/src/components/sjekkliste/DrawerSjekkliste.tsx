import { BodyLong, Heading, VStack } from '@navikt/ds-react';
import Sjekkliste from './Sjekkliste';

const SjekklisteDrawer = () => {
    return (
        <>
            <VStack gap="4">
                <VStack gap="1">
                    <Heading level="2" size="medium" spacing={true}>
                        Kontroller om deltaker kan meldes inn
                    </Heading>
                    <BodyLong spacing={true}>
                        Se om deltaker kan meldes inn i ungdomsprogrammet ved å gå gjennom sjekklisten under.
                    </BodyLong>
                </VStack>
                <Sjekkliste onChange={() => {}} showHeader={false} visResultat={true} />
            </VStack>
        </>
    );
};

export default SjekklisteDrawer;
