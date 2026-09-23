import { VStack } from '@navikt/ds-react';
import { HashRouter } from 'react-router-dom';

import { DemoInformasjon } from './DemoInformasjon';
import { DemoScenarioHeader } from './DemoScenarioHeader';

const DemoAppRouter = ({ children }: { children: React.ReactNode }) => {
    return (
        <HashRouter>
            <div className="demoMode">
                <VStack gap="space-40">
                    <DemoScenarioHeader />
                    <aside>
                        <DemoInformasjon />
                    </aside>
                </VStack>
                {children}
            </div>
        </HashRouter>
    );
};

export default DemoAppRouter;
