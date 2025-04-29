import { BrowserRouter } from 'react-router-dom';
import { getRequiredEnv } from '@navikt/sif-common-env';
import { LoadingPage } from '@navikt/sif-common-soknad-ds/src';
import HentDeltakerErrorPage from '../../components/pages/HentDeltakerErrorPage';
import { useBarn } from '../../hooks/useBarn';
import { useKontonummer } from '../../hooks/useKontonummer';
import { SøknadProvider } from './context/søknadContext';
import { useGetMellomlagring } from './hooks/useGetMellomlagring';
import SøknadRoutes from './SøknadRoutes';
import { MellomlagringDTO, zMellomlagringSchema } from '../../api/mellomlagring/mellomlagring';

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

    const gyldigMellomlagring = getGyldigMellomlagring(mellomlagring.data);

    if (gyldigMellomlagring) {
    }

    return (
        <BrowserRouter basename={publicPath}>
            <SøknadProvider
                mellomlagring={gyldigMellomlagring}
                kontonummer={kontonummer.data === null ? undefined : kontonummer.data?.kontonummer}
                barn={barn.data || []}>
                <SøknadRoutes />
            </SøknadProvider>
        </BrowserRouter>
    );
};

const getGyldigMellomlagring = (mellomlagring: MellomlagringDTO | undefined): MellomlagringDTO | undefined => {
    const result = zMellomlagringSchema.safeParse(mellomlagring);
    if (result.success) {
        return result.data;
    } else {
        return undefined;
    }
};

export default SøknadApp;
