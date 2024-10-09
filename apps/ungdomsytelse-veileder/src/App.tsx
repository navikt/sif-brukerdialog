import LoadingSpinner from '@navikt/sif-common-core-ds/src/atoms/loading-spinner/LoadingSpinner';
import Page from '@navikt/sif-common-core-ds/src/components/page/Page';
import { useInitialData } from './hooks/useInitialData';
import '@navikt/ds-css';
import './app.css';
import { BodyShort, Box, Heading, Tabs, VStack } from '@navikt/ds-react';
import LeggTilDeltakelseForm from './components/forms/LeggTilDeltakelseForm';
import ShadowBox from './components/ShadowBox';

const App = () => {
    const { initialData, isLoading } = useInitialData();

    if (isLoading || !initialData) {
        return (
            <center>
                <LoadingSpinner size="3xlarge" />
            </center>
        );
    }

    return (
        <Page title="Forside">
            <VStack gap="8">
                <Box>
                    <Heading level="1" size="medium" spacing={true}>
                        UNG-veileder
                    </Heading>
                    <BodyShort>Applikasjon for å teste ut informasjon om ungdomsytelsen.</BodyShort>
                </Box>

                <Tabs defaultValue="create">
                    <Tabs.List>
                        <Tabs.Tab value="create" label="Legg til deltakelse" />
                        <Tabs.Tab value="modify" label="Endre deltakelse" />
                    </Tabs.List>
                    <Tabs.Panel value="create">
                        <Box paddingBlock="4">
                            <ShadowBox>
                                <LeggTilDeltakelseForm />
                            </ShadowBox>
                        </Box>
                    </Tabs.Panel>
                    <Tabs.Panel value="modify">
                        <Box paddingBlock="4">
                            <ShadowBox>TODO</ShadowBox>
                        </Box>
                    </Tabs.Panel>
                </Tabs>
            </VStack>
        </Page>
    );
};

export default App;
