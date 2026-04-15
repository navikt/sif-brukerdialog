import { Box, ExpansionCard, Heading, Link, List, VStack } from '@navikt/ds-react';

import { AppText } from '../../../i18n';
import getLenker from '../../../lenker';

const OmSøknaden = () => {
    return (
        <VStack gap="space-32">
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
            <ExpansionCard data-color="neutral" size="small" aria-labelledby="personopplysninger-tittel">
                <ExpansionCard.Header>
                    <ExpansionCard.Title size="small">
                        <AppText id="page.velkommen.personopplysninger.tittel" />
                    </ExpansionCard.Title>
                </ExpansionCard.Header>
                <ExpansionCard.Content>
                    <VStack gap="space-8">
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
                                        <Link
                                            href={getLenker().personvernerklæring}
                                            target="_blank"
                                            rel="noopener noreferrer">
                                            {children}
                                        </Link>
                                    ),
                                }}
                            />
                        </p>
                    </VStack>
                </ExpansionCard.Content>
            </ExpansionCard>
        </VStack>
    );
};

export default OmSøknaden;
