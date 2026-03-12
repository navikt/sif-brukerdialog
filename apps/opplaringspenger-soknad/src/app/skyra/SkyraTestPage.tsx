import { Alert, BodyShort, Heading, VStack } from '@navikt/ds-react';
import Page from '@navikt/sif-common-core-ds/src/components/page/Page';

import Skyra, { Slug } from './Skyra';
import { useSkyraReloader } from './useSkyraReloader';

const SkyraTestPage = () => {
    useSkyraReloader();
    return (
        <Page title="Skyra testside">
            <VStack gap="space-40">
                <VStack gap="space-16">
                    <Heading size="large" level="1">
                        Skyra testside
                    </Heading>
                    <Alert variant="error">Side som tester om skyra-undersøkelse vises</Alert>
                </VStack>

                <VStack gap="space-40">
                    <div>
                        <Heading size="medium" level="2">
                            Prod
                        </Heading>
                        <BodyShort>Slug: {Slug.soknad_om_opplaringspenger}</BodyShort>
                        <Skyra slug={Slug.soknad_om_opplaringspenger} />
                    </div>
                </VStack>
            </VStack>
        </Page>
    );
};

export default SkyraTestPage;
