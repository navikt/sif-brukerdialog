import { LoadingPage } from '@navikt/sif-common-soknad-ds/src';
import HentDeltakerErrorPage from '../../components/pages/HentDeltakerErrorPage';
import { useBarn } from './hooks/api/useBarn';
import { useKontonummer } from './hooks/api/useKontonummer';
import { SøknadProvider } from './context/søknadContext';
import SøknadRouter from './SøknadRouter';

const SøknadApp = () => {
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
            <SøknadRouter />
        </SøknadProvider>
    );
};

export default SøknadApp;
