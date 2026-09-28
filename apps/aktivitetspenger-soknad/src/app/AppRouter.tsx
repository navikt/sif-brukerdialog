import { ReactNode } from 'react';
import { BrowserRouter } from 'react-router-dom';

import DemoAppRouter from '../demo/DemoAppRouter';
import { ScenarioHeader } from '../demo/ScenarioHeader';
import { getAppEnv } from './setup/appEnv';
import { isGitHubPages } from './utils/isGitHubPages';

const AppRouter = ({ children }: { children: ReactNode }) => {
    const env = getAppEnv();

    return isGitHubPages() ? (
        <DemoAppRouter>{children}</DemoAppRouter>
    ) : (
        <BrowserRouter basename={env.PUBLIC_PATH}>
            {__SCENARIO_HEADER__ ? <ScenarioHeader /> : null}
            {children}
        </BrowserRouter>
    );
};

export default AppRouter;
