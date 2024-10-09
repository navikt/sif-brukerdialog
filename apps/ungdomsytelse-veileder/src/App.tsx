import { BodyShort, Box, Heading, Tabs, VStack } from '@navikt/ds-react';
import { useState } from 'react';
import LoadingSpinner from '@navikt/sif-common-core-ds/src/atoms/loading-spinner/LoadingSpinner';
import Page from '@navikt/sif-common-core-ds/src/components/page/Page';
import EndreDeltakelseForm from './components/forms/EndreDeltakelseForm';
import HentDeltakelserForm from './components/forms/HentDeltakelseForm';
import LeggTilDeltakelseForm from './components/forms/LeggTilDeltakelseForm';
import ShadowBox from './components/ShadowBox';
import VelgDeltaker from './components/velg-deltaker/VelgDeltaker';
import { useInitialData } from './hooks/useInitialData';
import '@navikt/ds-css';
import './app.css';

const App = () => {
    const { initialData, isLoading } = useInitialData();
    const [deltakerFnr, setDeltakerFnr] = useState<string | undefined>('03867198392');

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

                <ShadowBox>
                    <VelgDeltaker onDeltakerValgt={setDeltakerFnr} valgtFnr={deltakerFnr} />
                </ShadowBox>

                {deltakerFnr && (
                    <Tabs defaultValue="leggTil">
                        <Tabs.List>
                            <Tabs.Tab value="leggTil" label="Legg til deltakelse" />
                            <Tabs.Tab value="hent" label="Hent deltakelser" />
                            <Tabs.Tab value="endre" label="Endre deltakelse" />
                        </Tabs.List>
                        <Tabs.Panel value="leggTil">
                            <Box paddingBlock="4">
                                <ShadowBox>
                                    <LeggTilDeltakelseForm deltakerFnr={deltakerFnr} />
                                </ShadowBox>
                            </Box>
                        </Tabs.Panel>
                        <Tabs.Panel value="hent">
                            <Box paddingBlock="4">
                                <ShadowBox>
                                    <HentDeltakelserForm deltakerFnr={deltakerFnr} />
                                </ShadowBox>
                            </Box>
                        </Tabs.Panel>
                        <Tabs.Panel value="endre">
                            <Box paddingBlock="4">
                                <ShadowBox>
                                    <EndreDeltakelseForm deltakerFnr={deltakerFnr} />
                                </ShadowBox>
                            </Box>
                        </Tabs.Panel>
                    </Tabs>
                )}
            </VStack>
        </Page>
    );
};

export default App;
