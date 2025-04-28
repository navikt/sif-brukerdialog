import { BrowserRouter } from 'react-router-dom';
import { getRequiredEnv } from '@navikt/sif-common-env';
import { SøknadProvider } from './context/søknadContext';
import SøknadRoutes from './SøknadRoutes';

const SøknadApp = () => {
    const publicPath = getRequiredEnv('PUBLIC_PATH');
    return (
        <BrowserRouter basename={publicPath}>
            <SøknadProvider>
                <SøknadRoutes />
            </SøknadProvider>
        </BrowserRouter>
    );
};

export default SøknadApp;
