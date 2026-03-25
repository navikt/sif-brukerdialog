import { VStack } from '@navikt/ds-react';
import { HashRouter } from 'react-router-dom';

import ScenarioHeader from './ScenarioHeader';

const DemoAppRouter = ({ children }: { children: React.ReactNode }) => {
    return (
        <HashRouter>
            <div className="demoMode">
                <VStack gap="space-40">
                    <ScenarioHeader />
                </VStack>
                <VStack marginBlock="space-0 space-128">{children}</VStack>
            </div>
        </HashRouter>
    );
};

export default DemoAppRouter;
