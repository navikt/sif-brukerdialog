import { VStack } from '@navikt/ds-react';
import { HashRouter } from 'react-router-dom';

import DemoInformasjon from './DemoInformasjon';
import ScenarioHeader from './ScenarioHeader';

const DemoAppRouter = ({ children }: { children: React.ReactNode }) => {
    return (
        <HashRouter>
            <div className="demoMode">
                <VStack gap="space-40">
                    <ScenarioHeader />
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
