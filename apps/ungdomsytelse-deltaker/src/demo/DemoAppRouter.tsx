import { VStack } from '@navikt/ds-react';
import { DemoWatermark } from '@sif/soknad-ui';
import { HashRouter } from 'react-router-dom';

import { DemoInformasjon } from './DemoInformasjon';
import { ScenarioHeader } from './ScenarioHeader';

const DemoAppRouter = ({ children }: { children: React.ReactNode }) => {
    return (
        <HashRouter>
            <DemoWatermark>
                <VStack gap="space-40">
                    <ScenarioHeader />
                    <aside>
                        <DemoInformasjon />
                    </aside>
                </VStack>
                {children}
            </DemoWatermark>
        </HashRouter>
    );
};

export default DemoAppRouter;
