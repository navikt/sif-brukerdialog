import { AppText } from '@app/i18n';
import { Accordion, Box, Heading, List, ReadMore, VStack } from '@navikt/ds-react';

import BehandlingAvPersonopplysningerContent from './BehandlingAvPersonopplysningerContent';
import { Todo } from '../../components/Todo';

const OmSøknaden = () => {
    return (
        <VStack gap="space-24">
            <Box>
                <Heading level="2" size="medium" spacing={true}>
                    <AppText id="page.velkommen.omSøknaden.tittel" />
                </Heading>
                <Todo>
                    Tekst er ikke gjennomgått, og informasjon mangler om hvilke opplysninger vi henter inn.
                    <ReadMore header="Tilbakemelding PVK">
                        I tilknytning til K108.2 Personvern E729.1 Aktivitetspenger - saksbehandling skriver de: Får den
                        registrerte noe informasjon om hvilke opplysninger som behandles om seg, ut over opplysninger om
                        barn, i søknadsdialogen? Det bør gis informasjon om hvilke opplysninger Nav innhenter og
                        behandler om vedkommende før bruker sender inn søknad om aktivitetspenger (suksesskriterium 1).
                        Det samme gjelder når det skjer endringer i antall barn og det blir endringer i barnetillegg.
                        Har vi på plass denne infoen?
                    </ReadMore>
                </Todo>
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
