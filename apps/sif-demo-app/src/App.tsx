import { Box, Tabs, VStack } from '@navikt/ds-react';
import { injectDecoratorClientSide } from '@navikt/nav-dekoratoren-moduler';
import LoadingSpinner from '@navikt/sif-common-core-ds/src/atoms/loading-spinner/LoadingSpinner';
import Page from '@navikt/sif-common-core-ds/src/components/page/Page';
import { getMaybeEnv } from '@navikt/sif-common-env';
import { enableMocking } from '../mock/enableMocking';
import ArbeidsgiverInfo from './components/ArbeidsgiverInfo';
import BarnInfo from './components/BarnInfo';
import SøkerInfo from './components/SøkerInfo';
import DemoForm from './forms/DemoForm';
import { useInitialData } from './hooks/useInitialData';
import '@navikt/ds-css';

enableMocking();

if (getMaybeEnv('ENV') !== 'prod') {
    injectDecoratorClientSide({
        env: 'dev',
        params: {
            simple: false,
            chatbot: true,
        },
    });
}

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
            <VStack gap="10">
                <DemoForm />
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
            </VStack>
        </Page>
    );
};

export default App;
