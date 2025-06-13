import { Alert, BodyLong, BoxNew, Heading, HStack, Page, VStack } from '@navikt/ds-react';
import { useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDocumentTitle } from '@navikt/sif-common-hooks';
import { Deltakelse, Deltaker } from '@navikt/ung-common';
import BorderBox from '../../atoms/BorderBox';
import AppPage from '../../components/app-page/AppPage';
import FinnDeltakerForm from '../../forms/finn-deltaker-form/FinnDeltakerForm';
import { InformationSquareIcon } from '@navikt/aksel-icons';

const StartPage = () => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    useDocumentTitle('Finn deltaker - Nav veileder - ungdomsprogramytelsen');

    useEffect(() => {
        queryClient.resetQueries();
    }, []);

    const handleDeltakerFetched = (deltaker: Deltaker) => {
        queryClient.setQueryData(['deltaker', deltaker.id], deltaker); // Lagre deltaker i cache
        navigate(`/deltaker/${deltaker.id}`);
    };

    const handleDeltakelseRegistrert = (deltakelse: Deltakelse) => {
        navigate(`/deltaker/${deltakelse.deltaker.id}`);
    };

    return (
        <BoxNew background="default" paddingBlock="0">
            <AppPage>
                <Page.Block gutters={true}>
                    <HStack align="center" justify="center" paddingBlock="20">
                        <VStack gap="10" maxWidth="45rem">
                            <VStack gap="4">
                                <Heading level="1" size="large">
                                    Ungdomsprogramytelsen - Nav veileder
                                </Heading>
                                <BodyLong size="large">
                                    Administrer deltakere i ungdomsprogrammet, slik at de mottar
                                    ungdoms&shy;program&shy;ytelsen til riktig tid.
                                </BodyLong>
                            </VStack>
                            <VStack className="items-center">
                                <BorderBox className="p-8 pt-8 pb-14 items-center w-full">
                                    <FinnDeltakerForm
                                        onDeltakerFetched={handleDeltakerFetched}
                                        onDeltakelseRegistrert={handleDeltakelseRegistrert}
                                    />
                                </BorderBox>
                            </VStack>
                            <VStack gap="4" marginBlock="4 0">
                                <Alert variant="info" size="small" className="w-full" inline>
                                    <BodyLong>
                                        Tips! Du finner mer informasjon om denne løsningen, ungdomsprogrammet og
                                        ungdomsprogramytelsen ved å klikke på{' '}
                                        <span>
                                            <InformationSquareIcon
                                                fontSize="1.6rem"
                                                display="inline"
                                                className="inline"
                                            />
                                        </span>{' '}
                                        ikonet i menyen oppe til høyre.
                                    </BodyLong>
                                </Alert>
                                <Alert variant="info" size="small" className="w-full" inline>
                                    <BodyLong>Hvis det er noe du lurer på, kan du ta kontakt med oss via ...</BodyLong>
                                </Alert>
                            </VStack>
                        </VStack>
                    </HStack>
                </Page.Block>
            </AppPage>
        </BoxNew>
    );
};

export default StartPage;
