import { Box, Heading } from '@navikt/ds-react';
import SifGuidePanel from '@navikt/sif-common-core-ds/src/components/sif-guide-panel/SifGuidePanel';
import DefaultPageLayout from '../../pages/layout/DefaultPageLayout';

const AppErrorFallback = () => (
    <DefaultPageLayout documentTitle="Aktivitetspenger - Det oppstod en feil">
        <Box paddingBlock="space-40">
            <SifGuidePanel mood="uncertain">
                <Heading level="2" size="medium">
                    Det oppstod en feil
                </Heading>
                <p>Du kan prøve å laste siden på nytt, eller du kan vente litt og prøve igjen senere.</p>
            </SifGuidePanel>
        </Box>
    </DefaultPageLayout>
);

export default AppErrorFallback;
