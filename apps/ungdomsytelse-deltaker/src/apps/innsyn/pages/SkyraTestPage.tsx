import { Alert, BodyShort, Heading, VStack } from '@navikt/ds-react';

import Skyra from '../../../components/skyra/Skyra';
import DefaultPageLayout from './layout/DefaultPageLayout';

const SkyraTestPage = () => {
    return (
        <DefaultPageLayout documentTitle="Skyra testside">
            <VStack gap="4">
                <Heading size="large" level="1">
                    Skyra testside
                </Heading>
                <Alert variant="error">Side som tester om skyra-undersøkelse vises</Alert>
            </VStack>

            <BodyShort>Slug: arbeids-og-velferdsetaten-nav/test-rapportering-av-inntekt</BodyShort>
            <Skyra slug="arbeids-og-velferdsetaten-nav/test-rapportering-av-inntekt" />
        </DefaultPageLayout>
    );
};

export default SkyraTestPage;
