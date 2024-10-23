import { useInitialData } from '../hooks/useInitialData';
import LoadingSpinner from '@navikt/sif-common-core-ds/src/atoms/loading-spinner/LoadingSpinner';
import { SøknadContextProvider } from './context/SøknadContext';
import SøknadRouter from './SøknadRouter';
import Page from '@navikt/sif-common-core-ds/src/components/page/Page';

const Søknad = () => {
    const { initialData, isLoading } = useInitialData();

    if (isLoading || !initialData) {
        return (
            <Page title="Henter informasjon">
                <center>
                    <LoadingSpinner size="3xlarge" />
                </center>
            </Page>
        );
    }

    return (
        <SøknadContextProvider initialData={initialData}>
            <SøknadRouter />
        </SøknadContextProvider>
    );
};

export default Søknad;
