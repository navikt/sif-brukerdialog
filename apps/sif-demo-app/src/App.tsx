import { Box, Tabs } from '@navikt/ds-react';
import LoadingSpinner from '@navikt/sif-common-core-ds/src/atoms/loading-spinner/LoadingSpinner';
import Page from '@navikt/sif-common-core-ds/src/components/page/Page';
import SøkerInfo from './components/SøkerInfo';
import { useInitialData } from './hooks/useInitialData';
import '@navikt/ds-css';
import BarnInfo from './components/BarnInfo';
import ArbeidsgiverInfo from './components/ArbeidsgiverInfo';

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

    const { søker, barn, arbeidsgivere } = initialData;
    return (
        <Page title="Forside">
            <Tabs defaultValue="arbeidsgivere">
                <Tabs.List>
                    <Tabs.Tab value="søker" label="Søker" />
                    <Tabs.Tab value="barn" label="Barn" />
                    <Tabs.Tab value="arbeidsgivere" label="Arbeidsgivere" />
                </Tabs.List>
                <Tabs.Panel value="søker">
                    <Box paddingBlock="4">
                        <SøkerInfo søker={søker} />
                    </Box>
                </Tabs.Panel>
                <Tabs.Panel value="barn">
                    <Box paddingBlock="4">
                        <BarnInfo barn={barn} />
                    </Box>
                </Tabs.Panel>
                <Tabs.Panel value="arbeidsgivere">
                    <Box paddingBlock="4">
                        <ArbeidsgiverInfo arbeidsgivere={arbeidsgivere} />
                    </Box>
                </Tabs.Panel>
            </Tabs>
        </Page>
    );
};

export default App;
