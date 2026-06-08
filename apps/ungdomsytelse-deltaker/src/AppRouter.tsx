import { getRequiredEnv } from '@navikt/sif-common-env';
import { BrowserRouter } from 'react-router-dom';

import DemoAppRouter from './demo/DemoAppRouter';

const AppRouter = ({ children }: { children: React.ReactNode }) => {
    const publicPath = getRequiredEnv('PUBLIC_PATH');

    return __IS_GITHUB_PAGES__ || __IS_VEILEDER_DEMO__ ? (
        <DemoAppRouter>{children}</DemoAppRouter>
    ) : (
        <BrowserRouter basename={publicPath}>{children}</BrowserRouter>
    );
};

export default AppRouter;
