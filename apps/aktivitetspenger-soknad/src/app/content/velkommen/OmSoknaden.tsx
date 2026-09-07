import { AppText } from '@app/i18n';
import { Accordion, BodyShort, Box, Heading, List, VStack } from '@navikt/ds-react';

import BehandlingAvPersonopplysningerContent from './BehandlingAvPersonopplysningerContent';
import ReglerOgAutomatiskSaksbehandlingContent from './ReglerOgAutomatiskSaksbehandlingContent';
import { Todo } from '../../components/Todo';

const OmSøknaden = () => {
    return (
        <VStack gap="space-24">
            <Todo>
                <BodyShort>Tekster under rettsregler er ikke ferdige</BodyShort>
            </Todo>
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
                        <AppText id="page.velkommen.personopplysninger.tittel" />
                    </Accordion.Header>
                    <Accordion.Content>
                        <BehandlingAvPersonopplysningerContent />
                    </Accordion.Content>
                </Accordion.Item>
                <Accordion.Item>
                    <Accordion.Header>
                        <AppText id="page.velkommen.regler.tittel" />
                    </Accordion.Header>
                    <Accordion.Content>
                        <ReglerOgAutomatiskSaksbehandlingContent />
                    </Accordion.Content>
                </Accordion.Item>
            </Accordion>
        </VStack>
    );
};

export default OmSøknaden;
