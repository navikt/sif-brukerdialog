import { BrowserRouter } from 'react-router-dom';
import { getRequiredEnv } from '@navikt/sif-common-env';
import { LoadingPage } from '@navikt/sif-common-soknad-ds/src';
import HentDeltakerErrorPage from '../../components/pages/HentDeltakerErrorPage';
import { useBarn } from '../../hooks/useBarn';
import { useKontonummer } from '../../hooks/useKontonummer';
import { SøknadProvider } from './context/søknadContext';
import { useGetMellomlagring } from './hooks/useGetMellomlagring';
import SøknadRoutes from './SøknadRoutes';

const SøknadApp = () => {
    const publicPath = getRequiredEnv('PUBLIC_PATH');

    const mellomlagring = useGetMellomlagring();
    const kontonummer = useKontonummer();
    const barn = useBarn();

    const isLoading = barn.isLoading || kontonummer.isLoading || mellomlagring.isLoading;
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
                mellomlagring={mellomlagring.data}
                kontonummer={kontonummer.data === null ? undefined : kontonummer.data?.kontonummer}
                barn={barn.data || []}>
                <SøknadRoutes />
            </SøknadProvider>
        </BrowserRouter>
    );
};

export default SøknadApp;
