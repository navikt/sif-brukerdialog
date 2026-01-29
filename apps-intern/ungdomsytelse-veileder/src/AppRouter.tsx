import { getRequiredEnv } from '@navikt/sif-common-env';
import { BrowserRouter, HashRouter } from 'react-router-dom';

const AppRouter = ({ children }: { children: React.ReactNode }) => {
    const publicPath = getRequiredEnv('PUBLIC_PATH');
    return __IS_VEILEDER_DEMO__ ? (
        <HashRouter>
            <div className="demoMode">{children}</div>
        </HashRouter>
    ) : (
        <BrowserRouter basename={publicPath}>{children}</BrowserRouter>
    );
};

export default AppRouter;
