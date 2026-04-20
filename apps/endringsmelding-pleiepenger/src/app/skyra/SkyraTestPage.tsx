import { Alert, BodyShort, Button, Heading, VStack } from '@navikt/ds-react';
import Page from '@navikt/sif-common-core-ds/src/components/page/Page';
import { Route, Routes, useNavigate } from 'react-router-dom';

import Skyra, { Slug } from './Skyra';
import { SkyraHandler } from './SkyraHandler';

const Page2 = () => {
    const navigate = useNavigate();
    return (
        <Page title="Skyra testside">
            <VStack gap="space-40">
                <VStack gap="space-16">
                    <Heading size="large" level="1">
                        Skyra testside
                    </Heading>
                    <Alert variant="error">Side som tester om skyra-undersøkelse vises</Alert>
                    <Button type="button" variant="primary" onClick={() => navigate('/soknad/skyra/test/page1')}>
                        Gå til side 1
                    </Button>
                </VStack>
                <VStack gap="space-40">
                    <div>
                        <Heading size="medium" level="2">
                            Test
                        </Heading>
                        <BodyShort>Slug: {Slug.kvittering_inline}</BodyShort>
                        <Skyra slug={Slug.kvittering_inline} />
                    </div>
                </VStack>
            </VStack>
        </Page>
    );
};
const Page1 = () => {
    const navigate = useNavigate();
    return (
        <Page title="Skyra testside">
            <VStack gap="space-40">
                <VStack gap="space-16">
                    <Heading size="large" level="1">
                        Skyra testside - uten reloader
                    </Heading>
                    <Alert variant="error">Side som tester om skyra-undersøkelse vises</Alert>
                </VStack>

                <Button type="button" variant="primary" onClick={() => navigate('/soknad/skyra/test/page2')}>
                    Gå til side 2
                </Button>
            </VStack>
        </Page>
    );
};

const SkyraTestPage = () => {
    return (
        <>
            <SkyraHandler />
            <Routes>
                <Route path="/skyra/test" element={<Page1 />} />
                <Route path="/skyra/test/page1" element={<Page1 />} />
                <Route path="/skyra/test/page2" element={<Page2 />} />
            </Routes>
        </>
    );
};

export default SkyraTestPage;
