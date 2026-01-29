import { BodyLong, Heading, Link, VStack } from '@navikt/ds-react';
import Sjekkliste from './Sjekkliste';

const SjekklisteDrawer = () => {
    return (
        <>
            <VStack gap="space-16">
                <VStack gap="space-4">
                    <Heading level="2" size="medium" spacing={true}>
                        Sjekk om den unge kan meldes inn i ungdomsprogrammet
                    </Heading>
                    <div>
                        <BodyLong spacing={true}>
                            Sjekk om den unge kan meldes inn i ungdomsprogrammet ved å gå gjennom sjekklisten under.
                        </BodyLong>
                        <BodyLong spacing={true}>
                            <Link
                                href="https://lovdata.no/nav/rundskriv/r76-13-04-for?q=Ungdomsprogram"
                                target="_blank"
                                rel="noreferrer noopener">
                                Les mer i rundskriv til forskrift om forsøk med ungdomsprogram og ungdomsprogramytelse
                            </Link>
                        </BodyLong>
                    </div>
                </VStack>
                <Sjekkliste onChange={() => {}} showHeader={false} visResultat={true} />
            </VStack>
        </>
    );
};

export default SjekklisteDrawer;
