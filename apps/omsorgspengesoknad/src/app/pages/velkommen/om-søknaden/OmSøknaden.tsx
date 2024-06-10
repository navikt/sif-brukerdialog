import { Accordion, Box, Heading, Link, List, VStack } from '@navikt/ds-react';
import { AppText, useAppIntl } from '../../../i18n';
import getLenker from '../../../lenker';

const OmSøknaden = () => {
    const { text } = useAppIntl();
    return (
        <VStack gap="4">
            <Box>
                <Heading level="2" size="large" spacing={true}>
                    <AppText id="page.velkommen.omSøknaden.tittel" />
                </Heading>

                <List>
                    <List.Item>
                        <AppText id="page.velkommen.omSøknaden.1" />
                    </List.Item>
                    <List.Item>
                        <AppText id="page.velkommen.omSøknaden.3" />
                    </List.Item>
                    <List.Item>
                        <AppText id="page.velkommen.omSøknaden.2" />
                    </List.Item>
                </List>
            </Box>

            <Accordion>
                <Accordion.Item>
                    <Accordion.Header>{text('page.velkommen.personopplysninger.3')}</Accordion.Header>
                    <Accordion.Content>
                        <p>
                            <AppText id="page.velkommen.personopplysninger.4" />
                        </p>
                        <List>
                            <List.Item>
                                <AppText id="page.velkommen.personopplysninger.4.1" />
                            </List.Item>
                            <List.Item>
                                <AppText id="page.velkommen.personopplysninger.4.2" />
                            </List.Item>
                            <List.Item>
                                <AppText id="page.velkommen.personopplysninger.4.3" />
                            </List.Item>
                            <List.Item>
                                <AppText id="page.velkommen.personopplysninger.4.4" />
                            </List.Item>
                            <List.Item>
                                <AppText id="page.velkommen.personopplysninger.4.5" />
                            </List.Item>
                            <List.Item>
                                <AppText id="page.velkommen.personopplysninger.4.6" />
                            </List.Item>
                        </List>
                    </Accordion.Content>
                </Accordion.Item>
                <Accordion.Item>
                    <Accordion.Header>Hvordan vi behandler personopplysninger</Accordion.Header>
                    <Accordion.Content>
                        <p>
                            Vi innhenter og mottar opplysninger om deg for å behandle saken din. Det er nødvendig for at
                            du skal få riktig tjeneste.
                        </p>
                        <p>
                            <AppText
                                id="page.velkommen.personopplysninger.5"
                                values={{
                                    Lenke: (children: React.ReactNode) => (
                                        <Link href={getLenker().personvern} target="_blank">
                                            {children}
                                        </Link>
                                    ),
                                }}
                            />
                        </p>
                    </Accordion.Content>
                </Accordion.Item>
                <Accordion.Item>
                    <Accordion.Header>Automatisk saksbehandling</Accordion.Header>
                    <Accordion.Content>Deler av saken din behandles automatisk.</Accordion.Content>
                </Accordion.Item>
            </Accordion>
        </VStack>
    );
};

export default OmSøknaden;
