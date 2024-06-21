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
                        <AppText id="page.velkommen.omSøknaden.2" />
                    </List.Item>
                    <List.Item>
                        <AppText id="page.velkommen.omSøknaden.3" />
                    </List.Item>
                </List>
            </Box>

            <Accordion>
                <Accordion.Item>
                    <Accordion.Header>{text('page.velkommen.personopplysninger.tittel')}</Accordion.Header>
                    <Accordion.Content>
                        <VStack gap="2">
                            <div>
                                <Heading level="3" size="xsmall" spacing={true}>
                                    <AppText id="page.velkommen.personopplysninger.behandler.tittel" />
                                </Heading>
                                <p>
                                    <AppText id="page.velkommen.personopplysninger.behandler.info" />
                                </p>
                            </div>
                            <div>
                                <Heading level="3" size="xsmall" spacing={true}>
                                    <AppText id="page.velkommen.personopplysninger.innhenter.tittel" />
                                </Heading>
                                <p>
                                    <AppText id="page.velkommen.personopplysninger.innhenter" />
                                </p>
                                <List>
                                    <List.Item>
                                        <AppText id="page.velkommen.personopplysninger.innhenter.1" />
                                    </List.Item>
                                    <List.Item>
                                        <AppText id="page.velkommen.personopplysninger.innhenter.2" />
                                    </List.Item>
                                    <List.Item>
                                        <AppText id="page.velkommen.personopplysninger.innhenter.3" />
                                    </List.Item>
                                    <List.Item>
                                        <AppText id="page.velkommen.personopplysninger.innhenter.4" />
                                    </List.Item>
                                    <List.Item>
                                        <AppText id="page.velkommen.personopplysninger.innhenter.5" />
                                    </List.Item>
                                    <List.Item>
                                        <AppText id="page.velkommen.personopplysninger.innhenter.6" />
                                    </List.Item>
                                </List>
                            </div>
                            <p>
                                <AppText
                                    id="page.velkommen.personopplysninger.5.3"
                                    values={{
                                        Lenke: (children: React.ReactNode) => (
                                            <Link href={getLenker().personvern} target="_blank">
                                                {children}
                                            </Link>
                                        ),
                                    }}
                                />
                            </p>
                        </VStack>
                    </Accordion.Content>
                </Accordion.Item>
            </Accordion>
        </VStack>
    );
};

export default OmSøknaden;
