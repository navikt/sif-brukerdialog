import { Heading, List, VStack } from '@navikt/ds-react';
import Sjekkliste from './Sjekkliste';
import ExternalLink from '../external-link/ExternalLink';
import { ParagraphIcon } from '@navikt/aksel-icons';

const SjekklisteDrawer = () => {
    return (
        <VStack gap="space-32" paddingBlock="space-0 space-128" paddingInline="space-16 space-24">
            <VStack gap="space-16">
                <Heading level="2" size="large">
                    Sjekk om den unge kan meldes inn i ungdomsprogrammet
                </Heading>
                <List>
                    <List.Item icon={<ParagraphIcon role="presentation" fontSize="1.25rem" />}>
                        <ExternalLink href="https://lovdata.no/nav/rundskriv/r76-13-04-for?q=Ungdomsprogram">
                            Rundskriv til forskrift om forsøk med ungdomsprogram og ungdomsprogramytelse
                        </ExternalLink>
                    </List.Item>
                </List>
            </VStack>
            <Sjekkliste visResultat={true} />
        </VStack>
    );
};

export default SjekklisteDrawer;
