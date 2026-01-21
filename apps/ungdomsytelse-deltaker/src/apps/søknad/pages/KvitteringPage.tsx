import { Alert, BodyLong, Button, Heading, Link, List, VStack } from '@navikt/ds-react';
import { AppText, useAppIntl } from '@shared/i18n';
import DefaultPageLayout from '@shared/pages/layout/DefaultPageLayout';
import getLenker from '@shared/utils/lenker';

import ExternalLink from '../../../components/external-link/ExternalLink';
import SøknadHeader from '../components/søknad-header/SøknadHeader';

const KvitteringPage = () => {
    const { text } = useAppIntl();
    return (
        <DefaultPageLayout documentTitle={text('kvitteringPage.dokumentTittel')}>
            <VStack gap="space-32">
                <SøknadHeader />

                <Alert variant="success">
                    <Heading level="2" size="small" spacing>
                        <AppText id="kvitteringPage.tittel" />
                    </Heading>
                    <BodyLong>
                        <AppText id="kvitteringPage.beskrivelse" />
                    </BodyLong>
                </Alert>

                <div>
                    <Heading level="3" size="small" spacing>
                        <AppText id="kvitteringPage.hvaSkjerVidere" />
                    </Heading>
                    <List>
                        <List.Item>
                            <AppText
                                id="kvitteringPage.hvaSkjerVidere.1"
                                values={{
                                    Lenke: (children) => <Link href={getLenker().minSide}>{children}</Link>,
                                }}
                            />
                        </List.Item>
                        <List.Item>
                            <AppText id="kvitteringPage.hvaSkjerVidere.2" />
                        </List.Item>
                        <List.Item>
                            <AppText
                                id="kvitteringPage.hvaSkjerVidere.3"
                                values={{
                                    Lenke: (children) => <Link href={getLenker().minSide}>{children}</Link>,
                                }}
                            />
                        </List.Item>
                        <List.Item>
                            <AppText
                                id="kvitteringPage.hvaSkjerVidere.4"
                                values={{
                                    Lenke: (children) => (
                                        <ExternalLink href={getLenker().skattekort}>{children}</ExternalLink>
                                    ),
                                }}
                            />
                        </List.Item>
                    </List>
                </div>

                <BodyLong>
                    <AppText id="kvitteringPage.lykkeTil" />
                </BodyLong>

                <div>
                    <Button as="a" href={getLenker().minSide}>
                        <AppText id="kvitteringPage.gåTilMinSide" />
                    </Button>
                </div>
            </VStack>
        </DefaultPageLayout>
    );
};

export default KvitteringPage;
