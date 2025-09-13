import { Accordion, Box, Heading, List, VStack } from '@navikt/ds-react';
import { AppText } from '../../i18n';
import BehandlingAvPersonopplysningerContent from './BehandlingAvPersonopplysningerContent';

const OmSøknaden = () => {
    return (
        <VStack gap="6">
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
};

export default OmSøknaden;
