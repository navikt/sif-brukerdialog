import { VStack } from '@navikt/ds-react';
import { HashRouter } from 'react-router-dom';

import VeilederDemoInformasjon from './VeilederDemoInformasjon';
import VeilederScenarioHeader from './VeilederScenarioHeader';

const DemoAppRouter = ({ children }: { children: React.ReactNode }) => {
    return (
        <HashRouter>
            <div className="demoMode">
                <aside>
                    <VStack gap="10">
                        <VeilederScenarioHeader />
                        <VeilederDemoInformasjon />
                    </VStack>
                </aside>
                {children}
            </div>
        </HashRouter>
    );
};

export default DemoAppRouter;
