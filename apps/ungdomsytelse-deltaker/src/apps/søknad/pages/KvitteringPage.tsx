import { Alert, BodyLong, Button, Heading, List, VStack } from '@navikt/ds-react';

import { AppText, useAppIntl } from '../../../i18n';
import getLenker from '../../../utils/lenker';
import DefaultPageLayout from '../../../pages/layout/DefaultPageLayout';
import SøknadHeader from '../components/søknad-header/SøknadHeader';

const KvitteringPage = () => {
    const { text } = useAppIntl();
    return (
        <DefaultPageLayout documentTitle={text('kvitteringPage.dokumentTittel')}>
            <VStack gap="8">
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
                            <AppText id="kvitteringPage.hvaSkjerVidere.1" />
                        </List.Item>
                        <List.Item>
                            <AppText id="kvitteringPage.hvaSkjerVidere.2" />
                        </List.Item>
                        <List.Item>
                            <AppText id="kvitteringPage.hvaSkjerVidere.3" />
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
