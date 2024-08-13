import { Accordion, Box, Heading, Link, List, VStack } from '@navikt/ds-react';
import { useAppIntl } from '@i18n/index';
import { AppText } from '../../../i18n';
import getLenker from '../../../lenker';
import BehandlingAvPersonopplysningerContent from './BehandlingAvPersonopplysningerContent';

const OmSøknaden = () => {
    const { text } = useAppIntl();
    return (
        <VStack gap="4">
            <Box>
                <Heading level="2" size="medium" spacing={true}>
                    <AppText id="page.velkommen.omSøknaden.tittel" />
                </Heading>
                <List>
                    <List.Item>
                        <AppText id="page.velkommen.omSøknaden.1" />
                    </List.Item>
                    <List.Item>
                        <AppText id="page.velkommen.omSøknaden.fremoverITid" />
                    </List.Item>
                    <List.Item>
                        <AppText id="page.velkommen.omSøknaden.2" />
                    </List.Item>
                    <List.Item>
                        <AppText id="page.velkommen.omSøknaden.3" />
                    </List.Item>
                </List>
            </Box>
            <Accordion>
                <Accordion.Item>
                    <Accordion.Header>{text('page.velkommen.omSøknaden.endringer.tittel')}</Accordion.Header>
                    <Accordion.Content>
                        <p>
                            <AppText id="page.velkommen.omSøknaden.endringer.tekst.1.a" />{' '}
                            <Link href={getLenker('nb').endringsmelding} target="_blank">
                                <AppText id="page.velkommen.omSøknaden.endringer.tekst.1.b" />
                            </Link>
                            <AppText id="page.velkommen.omSøknaden.endringer.tekst.1.c" />
                        </p>
                        <p>
                            <AppText id="page.velkommen.omSøknaden.endringer.tekst.2.a" />{' '}
                            <Link href={getLenker('nb').skrivTilOss} target="_blank">
                                <AppText id="page.velkommen.omSøknaden.endringer.tekst.2.b" />
                            </Link>
                            <AppText id="page.velkommen.omSøknaden.endringer.tekst.2.c" />
                        </p>
                    </Accordion.Content>
                </Accordion.Item>
                <Accordion.Item>
                    <Accordion.Header>{text('page.velkommen.omSøknaden.4')}</Accordion.Header>
                    <Accordion.Content>
                        <BehandlingAvPersonopplysningerContent />
                    </Accordion.Content>
                </Accordion.Item>
            </Accordion>
        </VStack>
    );
};

export default OmSøknaden;
