import { Accordion, BodyShort, Box, Heading, List, VStack } from '@navikt/ds-react';
import { AppText, useAppIntl } from '../../i18n';
import BehandlingAvPersonopplysningerContent from './BehandlingAvPersonopplysningerContent';

const OmSøknaden = () => {
    const { text } = useAppIntl();
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
            <Accordion data-color="neutral">
                <Accordion.Item>
                    <Accordion.Header>
                        <BodyShort weight="semibold" size="large" as="span">
                            {text('page.velkommen.omSøknaden.4')}
                        </BodyShort>
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
