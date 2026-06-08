import { VStack } from '@navikt/ds-react';
import { HashRouter } from 'react-router-dom';

import { DemoScenarioHeader } from './DemoScenarioHeader';
import { DemoInformasjon } from './DemoInformasjon';

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
