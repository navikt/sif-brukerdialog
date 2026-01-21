import { Box, Heading, HStack, Page } from '@navikt/ds-react';
import SifGuidePanel from '@navikt/sif-common-core-ds/src/components/sif-guide-panel/SifGuidePanel';

const AppErrorFallback = () => (
    <Box background="default" paddingBlock="space-0">
        <Page.Block gutters={true}>
            <HStack align="center" justify="center" paddingBlock="space-80">
                <SifGuidePanel mood="uncertain">
                    <Heading level="2" size="medium">
                        Det oppstod en feil
                    </Heading>
                    <p>Du kan prøve å laste siden på nytt, eller du kan vente litt og prøve igjen senere.</p>
                </SifGuidePanel>
            </HStack>
        </Page.Block>
    </Box>
);

export default AppErrorFallback;
