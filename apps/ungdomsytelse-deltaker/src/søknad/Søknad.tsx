import { useInitialData } from '../hooks/useInitialData';
import LoadingSpinner from '@navikt/sif-common-core-ds/src/atoms/loading-spinner/LoadingSpinner';
import { SøknadContextProvider } from './context/SøknadContext';
import SøknadRouter from './SøknadRouter';
import Page from '@navikt/sif-common-core-ds/src/components/page/Page';
import { ErrorPage } from '@navikt/sif-common-soknad-ds/src';
import SifGuidePanel from '@navikt/sif-common-core-ds/src/components/sif-guide-panel/SifGuidePanel';
import { Heading } from '@navikt/ds-react';

const Søknad = () => {
    const { initialData, isLoading, error } = useInitialData();

    if (error) {
        return (
            <ErrorPage
                pageTitle="Det oppstod en feil"
                bannerTitle="sdf"
                contentRenderer={() => {
                    return (
                        <SifGuidePanel mood="uncertain">
                            <Heading level="2" size="medium">
                                Det oppstod en feil
                            </Heading>
                            <pre style={{ fontSize: '.8rem', lineHeight: '1rem' }}>
                                {JSON.stringify(error, undefined, 2)}
                            </pre>
                        </SifGuidePanel>
                    );
                }}></ErrorPage>
        );
    }

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
