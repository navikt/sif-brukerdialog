import { Box, Heading } from '@navikt/ds-react';
import DefaultPageLayout from '@shared/pages/layout/DefaultPageLayout';
import { SifGuidePanel } from '@sif/soknad-ui';

const AppErrorFallback = () => (
    <DefaultPageLayout documentTitle="Din ungdomsprogramytelse">
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
