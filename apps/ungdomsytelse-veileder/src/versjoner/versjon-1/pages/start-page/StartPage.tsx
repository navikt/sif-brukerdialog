import { HStack, Page, VStack } from '@navikt/ds-react';
import { useNavigate } from 'react-router-dom';
import { Deltakelse, Deltaker } from '../../../../api/types';
import HentDeltakerForm from '../../forms/HentDeltakerForm';

const StartPage = () => {
    const navigate = useNavigate();

    const handleDeltakerFetched = (deltaker: Deltaker) => {
        navigate(`/v1/deltaker/${deltaker.id}`);
    };

    const handleDeltakelseRegistrert = (deltakelse: Deltakelse) => {
        navigate(`/v1/deltaker/${deltakelse.deltaker.id}`);
    };

    return (
        <Page className="bg-gray-300">
            <HStack align={'center'} justify={'center'} paddingBlock="20">
                <VStack className="rounded-md bg-gray-100 p-8 pt-8 pb-8 items-center w-full" maxWidth={'30rem'}>
                    <VStack gap="8" className="w-full">
                        <HentDeltakerForm
                            onDeltakerFetched={handleDeltakerFetched}
                            onDeltakelseRegistrert={handleDeltakelseRegistrert}
                        />
                    </VStack>
                </VStack>
            </HStack>
        </Page>
    );
};

export default StartPage;
