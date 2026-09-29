import { ReactNode } from 'react';
import { BrowserRouter } from 'react-router-dom';

import DemoAppRouter from '../demo/DemoAppRouter';
import { ScenarioHeader } from '../demo/ScenarioHeader';
import { getAppEnv } from './setup/appEnv';

const AppRouter = ({ children }: { children: ReactNode }) => {
    const env = getAppEnv();

    return __IS_GITHUB_PAGES__ ? (
        <DemoAppRouter>{children}</DemoAppRouter>
    ) : (
        <BrowserRouter basename={env.PUBLIC_PATH}>
            {__IS_DEMO__ ? <ScenarioHeader /> : null}
            {children}
        </BrowserRouter>
    );
};

export default AppRouter;
