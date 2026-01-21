import { VStack } from '@navikt/ds-react';
import { HashRouter } from 'react-router-dom';

import VeilederDemoInformasjon from './VeilederDemoInformasjon';
import VeilederScenarioHeader from './VeilederScenarioHeader';

const DemoAppRouter = ({ children }: { children: React.ReactNode }) => {
    return (
        <HashRouter>
            <div className="demoMode">
                <VStack gap="space-40">
                    <VeilederScenarioHeader />
                    <aside>
                        <VeilederDemoInformasjon />
                    </aside>
                </VStack>
                {children}
            </div>
        </HashRouter>
    );
};

export default DemoAppRouter;
