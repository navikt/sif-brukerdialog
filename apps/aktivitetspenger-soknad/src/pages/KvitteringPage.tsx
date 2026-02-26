import { Alert, BodyLong, Button, Heading, VStack } from '@navikt/ds-react';

import { AppText, useAppIntl } from '../i18n';
import SøknadHeader from '../søknad/components/søknad-header/SøknadHeader';
import getLenker from '../utils/lenker';
import DefaultPageLayout from './layout/DefaultPageLayout';

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
