import { getRequiredEnv } from '@navikt/sif-common-env';
import { BrowserRouter } from 'react-router-dom';

const AppRouter = ({ children }: { children: React.ReactNode }) => {
    const publicPath = getRequiredEnv('PUBLIC_PATH');
    return <BrowserRouter basename={publicPath}>{children}</BrowserRouter>;
};

export default AppRouter;
