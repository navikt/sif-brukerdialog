import { VStack } from '@navikt/ds-react';
import { HashRouter } from 'react-router-dom';

import VeilederDemoInformasjon from './VeilederDemoInformasjon';
import VeilederScenarioHeader from './VeilederScenarioHeader';

const DemoAppRouter = ({ children }: { children: React.ReactNode }) => {
    return (
        <HashRouter>
            <div className="demoMode">
                <header>
                    <VStack gap="10">
                        <VeilederScenarioHeader />
                        <VeilederDemoInformasjon />
                    </VStack>
                </header>
                {children}
            </div>
        </HashRouter>
    );
};

export default DemoAppRouter;
