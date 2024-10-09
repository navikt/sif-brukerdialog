import { BodyShort, Box, Heading, VStack } from '@navikt/ds-react';
import { useState } from 'react';
import LoadingSpinner from '@navikt/sif-common-core-ds/src/atoms/loading-spinner/LoadingSpinner';
import Page from '@navikt/sif-common-core-ds/src/components/page/Page';
import { useEffectOnce } from '@navikt/sif-common-hooks';
import DeltakelseTable from './components/deltakelse-table/DeltakelseTable';
import ShadowBox from './components/shadow-box/ShadowBox';
import VelgDeltaker from './components/velg-deltaker/VelgDeltaker';
import { useHentDeltakelser } from './hooks/useHentDeltakelser';
import '@navikt/ds-css';
import './app.css';
import LeggTilDeltakelseForm from './components/forms/LeggTilDeltakelseForm';

const App = () => {
    const [deltakerFnr, setDeltakerFnr] = useState<string | undefined>('03867198392');

    const { hentDeltakelserPending, hentDeltakelser, deltakelser } = useHentDeltakelser();
    useEffectOnce(() => {
        if (deltakerFnr) {
            hentDeltakelser(deltakerFnr);
        }
    });

    const handleDeltakerValgt = (fnr: string) => {
        setDeltakerFnr(fnr);
        if (fnr) {
            hentDeltakelser(fnr);
        }
    };

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
                    <VelgDeltaker onDeltakerValgt={handleDeltakerValgt} valgtFnr={deltakerFnr} />
                </ShadowBox>

                {deltakerFnr && (
                    <>
                        <Box>
                            <Heading level="2" size="medium" spacing={true}>
                                Deltakelser
                            </Heading>
                            {hentDeltakelserPending ? (
                                <center>
                                    <LoadingSpinner size="3xlarge" />
                                </center>
                            ) : (
                                <VStack gap="8">
                                    {deltakelser ? (
                                        <DeltakelseTable
                                            deltakelser={deltakelser}
                                            onDeltakelseEndret={() => hentDeltakelser}
                                            onDeltakelseSlettet={() => hentDeltakelser}
                                        />
                                    ) : null}
                                    <LeggTilDeltakelseForm deltakerFnr={deltakerFnr} />
                                </VStack>
                            )}
                        </Box>
                    </>
                )}
            </VStack>
        </Page>
    );
};

export default App;
