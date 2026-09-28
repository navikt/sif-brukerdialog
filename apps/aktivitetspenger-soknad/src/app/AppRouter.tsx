import { ReactNode } from 'react';
import { BrowserRouter } from 'react-router-dom';

import DemoAppRouter from '../demo/DemoAppRouter';
import { getAppEnv } from './setup/appEnv';
import { isGitHubPages } from './utils/isGitHubPages';

const AppRouter = ({ children }: { children: ReactNode }) => {
    const env = getAppEnv();

    return isGitHubPages() ? (
        <DemoAppRouter>{children}</DemoAppRouter>
    ) : (
        <BrowserRouter basename={env.PUBLIC_PATH}>{children}</BrowserRouter>
    );
};

export default AppRouter;
