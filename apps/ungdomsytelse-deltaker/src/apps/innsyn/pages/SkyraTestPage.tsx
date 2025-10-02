import { Alert, BodyShort, Heading, VStack } from '@navikt/ds-react';

import Skyra from '../../../components/skyra/Skyra';
import { useSkyraReloader } from '../hooks/useSkyraReloader';
import DefaultPageLayout from './layout/DefaultPageLayout';

const SkyraTestPage = () => {
    useSkyraReloader();
    return (
        <DefaultPageLayout documentTitle="Skyra testside">
            <VStack gap="4">
                <Heading size="large" level="1">
                    Skyra testside
                </Heading>
                <Alert variant="error">Side som tester om skyra-undersøkelse vises</Alert>
            </VStack>

            <VStack gap="10">
                <div>
                    <Heading size="medium" level="2">
                        Test
                    </Heading>
                    <BodyShort>Slug: arbeids-og-velferdsetaten-nav/test-rapportering-av-inntekt</BodyShort>
                    <Skyra slug="arbeids-og-velferdsetaten-nav/test-rapportering-av-inntekt" />
                </div>
                <div>
                    <Heading size="medium" level="2">
                        Prod
                    </Heading>
                    <BodyShort>Slug: arbeids-og-velferdsetaten-nav/ungdomsprorgramytelsen-rapportere-inntekt</BodyShort>
                    <Skyra slug="arbeids-og-velferdsetaten-nav/ungdomsprorgramytelsen-rapportere-inntekt" />
                </div>
            </VStack>
        </DefaultPageLayout>
    );
};

export default SkyraTestPage;
