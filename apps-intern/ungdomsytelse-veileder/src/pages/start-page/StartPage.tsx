import { Alert, Bleed, BodyLong, Box, Heading, HStack, Page, VStack } from '@navikt/ds-react';
import { useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDocumentTitle } from '@navikt/sif-common-hooks';
import BorderBox from '../../atoms/BorderBox';
import AppPage from '../../components/app-page/AppPage';
import FinnDeltakerForm from '../../forms/finn-deltaker-form/FinnDeltakerForm';
import { queryKeys } from '../../queries/queryKeys';
import { Deltakelse } from '../../types/Deltakelse';
import { Deltaker } from '../../types/Deltaker';
import { erÅpnetForRegistrering } from '../../utils/deltakelseUtils';
import InformasjonIntro from './InformasjonIntro';
import VeilederDemoInformasjon from '../../demo/VeilederDemoInformasjon';

const StartPage = () => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    useDocumentTitle('Finn deltaker - Deltakerregistrering - ungdomsprogrammet');

    useEffect(() => {
        queryClient.resetQueries();
    }, []);

    const handleDeltakerFetched = (deltaker: Deltaker) => {
        queryClient.setQueryData(queryKeys.deltakerById(deltaker.id), deltaker); // Lagre deltaker i cache
        navigate(`/deltaker/${deltaker.id}`);
    };

    const handleDeltakelseRegistrert = (deltakelse: Deltakelse) => {
        navigate(`/deltaker/${deltakelse.deltaker.id}`);
    };

    return (
        <Box paddingBlock="space-0">
            <AppPage>
                <Page.Block gutters={true}>
                    {__IS_VEILEDER_DEMO__ && <VeilederDemoInformasjon />}
                    <HStack align="center" justify="center" paddingBlock="space-56 space-0">
                        <VStack gap="space-32" maxWidth="44rem">
                            <VStack gap="space-16">
                                <Heading level="1" size="large">
                                    Deltakerregistrering - ungdomsprogrammet
                                </Heading>
                                <BodyLong size="large">
                                    Her registrerer du at deltakere er med i ungdoms&shy;programmet, slik at de får
                                    ungdoms&shy;program&shy;ytelsen til riktig tid.
                                </BodyLong>
                            </VStack>
                            <VStack className="items-center">
                                {erÅpnetForRegistrering() ? (
                                    <BorderBox className="p-8 pt-8 pb-14 items-center w-full">
                                        <FinnDeltakerForm
                                            onDeltakerFetched={handleDeltakerFetched}
                                            onDeltakelseRegistrert={handleDeltakelseRegistrert}
                                        />
                                    </BorderBox>
                                ) : (
                                    <Alert variant="info" className="w-full">
                                        Funksjonaliteten for å registrere deltakere blir tilgjengelig 11. august.
                                    </Alert>
                                )}
                            </VStack>
                            <Bleed marginBlock="space-16 space-0">
                                <InformasjonIntro />
                            </Bleed>
                        </VStack>
                    </HStack>
                </Page.Block>
            </AppPage>
        </Box>
    );
};

export default StartPage;
