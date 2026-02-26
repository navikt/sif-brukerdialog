import { Alert, BodyLong, Button, Heading, VStack } from '@navikt/ds-react';

import { AppText, useAppIntl } from '../i18n';
import DefaultPageLayout from './layout/DefaultPageLayout';
import getLenker from '../utils/lenker';
import SøknadHeader from '../søknad/components/søknad-header/SøknadHeader';

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
                    <Button as="a" href={getLenker().minSide}>
                        <AppText id="kvitteringPage.gåTilMinSide" />
                    </Button>
                </div>
            </VStack>
        </DefaultPageLayout>
    );
};

export default KvitteringPage;
