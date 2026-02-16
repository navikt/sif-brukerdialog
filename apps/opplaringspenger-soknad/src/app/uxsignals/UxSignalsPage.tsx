import { Heading, VStack } from '@navikt/ds-react';
import Page from '@navikt/sif-common-core-ds/src/components/page/Page';

import UXArbeidstidTilFravær from './UXArbeidstidTilFravær';

/** Testside for å se om undersøkelse dukker opp */
const UxSignalsPage = () => {
    return (
        <Page title="Testside - uxsignals">
            <VStack gap="space-16">
                <Heading level="1" size="large">
                    UX Signals - Testside
                </Heading>
                <VStack gap="space-16">
                    <Heading level="2" size="medium">
                        Fravær
                    </Heading>
                    <UXArbeidstidTilFravær />
                </VStack>
            </VStack>
        </Page>
    );
};

export default UxSignalsPage;
