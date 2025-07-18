import { Heading } from '@navikt/ds-react';
import Block from '@navikt/sif-common-core-ds/src/atoms/block/Block';
import SifGuidePanel from '@navikt/sif-common-core-ds/src/components/sif-guide-panel/SifGuidePanel';
import DefaultPageLayout from '../../apps/innsyn/pages/layout/DefaultPageLayout';

const AppErrorFallback = () => (
    <DefaultPageLayout documentTitle="Din ungdomsprogramytelse">
        <Block margin="xxxl">
            <SifGuidePanel mood="uncertain">
                <Heading level="2" size="medium">
                    Det oppstod en feil
                </Heading>
                <p>Du kan prøve å laste siden på nytt, eller du kan vente litt og prøve igjen senere.</p>
            </SifGuidePanel>
        </Block>
    </DefaultPageLayout>
);

export default AppErrorFallback;
