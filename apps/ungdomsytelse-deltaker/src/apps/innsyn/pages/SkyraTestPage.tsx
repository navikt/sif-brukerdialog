import { Alert, BodyShort, Heading, VStack } from '@navikt/ds-react';
import Skyra, { Slug } from '@shared/components/skyra/Skyra';
import { useSkyraReloader } from '@shared/hooks/useSkyraReloader';
import DefaultPageLayout from '@shared/pages/layout/DefaultPageLayout';

const SkyraTestPage = () => {
    useSkyraReloader();
    return (
        <DefaultPageLayout documentTitle="Skyra testside">
            <VStack gap="10">
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
                        <BodyShort>Slug: {Slug.test_rapporterInntekt}</BodyShort>
                        <Skyra slug={Slug.test_rapporterInntekt} />
                    </div>
                    <div>
                        <Heading size="medium" level="2">
                            Prod
                        </Heading>
                        <BodyShort>Slug: {Slug.prod_rapporterInntekt}</BodyShort>
                        <Skyra slug={Slug.prod_rapporterInntekt} />
                    </div>
                </VStack>
            </VStack>
        </DefaultPageLayout>
    );
};

export default SkyraTestPage;
