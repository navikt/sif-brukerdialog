import { BoxNew, Heading, HStack, Page } from '@navikt/ds-react';
import SifGuidePanel from '@navikt/sif-common-core-ds/src/components/sif-guide-panel/SifGuidePanel';

const AppErrorFallback = () => (
    <BoxNew background="default" paddingBlock="0">
        <Page.Block gutters={true}>
            <HStack align="center" justify="center" paddingBlock="20">
                <SifGuidePanel mood="uncertain">
                    <Heading level="2" size="medium">
                        Det oppstod en feil
                    </Heading>
                    <p>Du kan prøve å laste siden på nytt, eller du kan vente litt og prøve igjen senere.</p>
                </SifGuidePanel>
            </HStack>
        </Page.Block>
    </BoxNew>
);

export default AppErrorFallback;
