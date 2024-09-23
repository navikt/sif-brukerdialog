import '@navikt/ds-css';
import Page from '@navikt/sif-common-core-ds/src/components/page/Page';
import { useInitialData } from './hooks/useInitialData';
import LoadingSpinner from '@navikt/sif-common-core-ds/src/atoms/loading-spinner/LoadingSpinner';

const App = () => {
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

    const { søker, barn } = initialData;
    return (
        <Page title="Forside">
            Hei {søker?.fornavn}. Du har {barn.length} barn
        </Page>
    );
};

export default App;
