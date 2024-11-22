import { BodyShort, Box, Heading, VStack } from '@navikt/ds-react';
import { useState } from 'react';
import LoadingSpinner from '@navikt/sif-common-core-ds/src/atoms/loading-spinner/LoadingSpinner';
import Page from '@navikt/sif-common-core-ds/src/components/page/Page';
import { useEffectOnce } from '@navikt/sif-common-hooks';
import DeltakelseTable from '../../components/deltakelse-table/DeltakelseTable';
import LeggTilDeltakelseForm from '../../components/forms/LeggTilDeltakelseForm';
import ShadowBox from '../../components/shadow-box/ShadowBox';
import VelgDeltaker from '../../components/velg-deltaker/VelgDeltaker';
import { useHentDeltakelser } from '../../hooks/useHentDeltakelser';

const Versjon0 = () => {
    const [deltakerFnr, setDeltakerFnr] = useState<string | undefined>('56857102105');

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
                    <ShadowBox>
                        <Heading level="2" size="medium" spacing={true}>
                            Deltakelser
                        </Heading>
                        {hentDeltakelserPending ? (
                            <center>
                                <LoadingSpinner size="3xlarge" />
                            </center>
                        ) : (
                            <VStack gap="8">
                                {deltakelser && (
                                    <DeltakelseTable
                                        deltakelser={deltakelser}
                                        onDeltakelseEndret={() => hentDeltakelser(deltakerFnr)}
                                        onDeltakelseSlettet={() => hentDeltakelser(deltakerFnr)}
                                    />
                                )}
                                <LeggTilDeltakelseForm
                                    deltakerFnr={deltakerFnr}
                                    deltakelser={deltakelser || []}
                                    onDeltakelseLagtTil={() => hentDeltakelser(deltakerFnr)}
                                />
                            </VStack>
                        )}
                    </ShadowBox>
                )}
            </VStack>
        </Page>
    );
};

export default Versjon0;
