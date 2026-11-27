import { AppText } from '@app/i18n';
import { Accordion, Box, Heading, List, VStack } from '@navikt/ds-react';

import { BehandlingAvPersonopplysningerContent } from './BehandlingAvPersonopplysningerContent';

export const OmSøknaden = () => (
    <VStack gap="space-16">
        <Box>
            <Heading level="2" size="medium" spacing={true}>
                <AppText id="page.velkommen.omSøknaden.tittel" />
            </Heading>
            <List>
                <List.Item>
                    <AppText id="page.velkommen.omSøknaden.1" />
                </List.Item>
                <List.Item>
                    <AppText id="page.velkommen.omSøknaden.2" />
                </List.Item>
                <List.Item>
                    <AppText id="page.velkommen.omSøknaden.3" />
                </List.Item>
            </List>
        </Box>
        <Accordion data-color="accent">
            <Accordion.Item>
                <Accordion.Header>
                    <AppText id="page.velkommen.omSøknaden.4" />
                </Accordion.Header>
                <Accordion.Content>
                    <BehandlingAvPersonopplysningerContent />
                </Accordion.Content>
            </Accordion.Item>
        </Accordion>
    </VStack>
);
