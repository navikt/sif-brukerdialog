import { BrowserRouter } from 'react-router-dom';
import { getRequiredEnv } from '@navikt/sif-common-env';
import { SøknadProvider } from './context/søknadContext';
import SøknadRoutes from './SøknadRoutes';
import HentDeltakerErrorPage from '../../components/pages/HentDeltakerErrorPage';
import { LoadingPage } from '@navikt/sif-common-soknad-ds/src';
import { useKontonummer } from '../../hooks/useKontonummer';
import { useBarn } from '../../hooks/useBarn';

const SøknadApp = () => {
    const publicPath = getRequiredEnv('PUBLIC_PATH');

    const kontonummer = useKontonummer();
    const barn = useBarn();

    const isLoading = barn.isLoading || kontonummer.isLoading;
    const error = barn.isError;

    if (isLoading) {
        return <LoadingPage />;
    }

    if (error) {
        return <HentDeltakerErrorPage error="Feil ved lasting" />;
    }

    return (
        <BrowserRouter basename={publicPath}>
            <SøknadProvider
                /** kontonummer.data === null når det kommer 404 fra backend */
                kontonummer={kontonummer.data === null ? undefined : kontonummer.data?.kontonummer}
                barn={barn.data || []}>
                <SøknadRoutes />
            </SøknadProvider>
        </BrowserRouter>
    );
};

export default SøknadApp;
