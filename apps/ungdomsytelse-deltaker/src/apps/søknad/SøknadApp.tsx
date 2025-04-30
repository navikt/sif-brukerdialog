import { useLocation } from 'react-router-dom';
import { LoadingPage } from '@navikt/sif-common-soknad-ds/src';
import HentDeltakerErrorPage from '../../components/pages/HentDeltakerErrorPage';
import { useBarn } from '../../hooks/useBarn';
import { useKontonummer } from '../../hooks/useKontonummer';
import { SøknadProvider } from './context/søknadContext';
import SøknadRoutes from './SøknadRoutes';
import { useState } from 'react';

const SøknadApp = () => {
    const { pathname } = useLocation();
    const [inited, setInited] = useState(false);

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
        <SøknadProvider
            kontonummer={kontonummer.data === null ? undefined : kontonummer.data?.kontonummer}
            barn={barn.data || []}>
            <SøknadRoutes />
        </SøknadProvider>
    );
};

export default SøknadApp;
