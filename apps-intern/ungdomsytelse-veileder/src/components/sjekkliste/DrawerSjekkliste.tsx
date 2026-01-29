import { BodyLong, Heading, Link, VStack } from '@navikt/ds-react';
import Sjekkliste from './Sjekkliste';

const SjekklisteDrawer = () => {
    return (
        <VStack gap="space-16" paddingBlock="space-0 space-128" paddingInline="space-16 space-24">
            <VStack gap="space-12">
                <Heading level="2" size="medium" spacing={true}>
                    Sjekk om den unge kan meldes inn i ungdomsprogrammet
                </Heading>
                <BodyLong>
                    Sjekk om den unge kan meldes inn i ungdomsprogrammet ved å gå gjennom sjekklisten under. Som
                    bakgrunn kan du lese mer i{' '}
                    <Link
                        href="https://lovdata.no/nav/rundskriv/r76-13-04-for?q=Ungdomsprogram"
                        target="_blank"
                        style={{ display: 'inline' }}
                        rel="noreferrer noopener">
                        rundskriv til forskrift om forsøk med ungdomsprogram og ungdomsprogramytelse
                    </Link>
                </BodyLong>
            </VStack>
            <Sjekkliste visResultat={true} />
        </VStack>
    );
};

export default SjekklisteDrawer;
