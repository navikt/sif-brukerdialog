import { Alert, BodyLong, Button, Heading, VStack } from '@navikt/ds-react';

import SøknadHeader from '../components/søknad-header/SøknadHeader';
import { AppText, useAppIntl } from '../../i18n';
import DefaultPageLayout from '../../pages/layout/DefaultPageLayout';
import getLenker from '../../utils/lenker';

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
