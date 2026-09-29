import './demo.css';

import { AktivitetspengerSoknadApp } from '@navikt/sif-app-register';
import { DemoInfoAlert } from '@sif/soknad-ui';
import { ReactNode } from 'react';
import { HashRouter } from 'react-router-dom';

import { ScenarioHeader } from './ScenarioHeader';

/**
 * gh-pages har ingen server som kan rute på path, så demoen må bruke HashRouter
 * uten basename (i motsetning til BrowserRouter i AppRouter, som ruter på PUBLIC_PATH).
 */
const DemoAppRouter = ({ children }: { children: ReactNode }) => {
    return (
        <HashRouter>
            <div className="demoMode">
                <ScenarioHeader />
                <DemoInfoAlert appTitle={AktivitetspengerSoknadApp.tittel.nb} />
                {children}
            </div>
        </HashRouter>
    );
};

export default DemoAppRouter;
