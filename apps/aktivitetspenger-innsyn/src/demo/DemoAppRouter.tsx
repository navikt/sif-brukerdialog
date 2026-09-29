import { VStack } from '@navikt/ds-react';
import { AktivitetspengerInnsynApp } from '@navikt/sif-app-register';
import { DemoInfoAlert, DemoWatermark } from '@sif/soknad-ui';
import { ReactNode } from 'react';
import { HashRouter } from 'react-router-dom';

import { ScenarioHeader } from './ScenarioHeader';

const DemoAppRouter = ({ children }: { children: ReactNode }) => {
    return (
        <HashRouter>
            <DemoWatermark>
                <ScenarioHeader />
                <DemoInfoAlert appTitle={AktivitetspengerInnsynApp.tittel.nb} />
                <VStack marginBlock="space-0 space-128">{children}</VStack>
            </DemoWatermark>
        </HashRouter>
    );
};

export default DemoAppRouter;
