import { HStack, VStack } from '@navikt/ds-react';
import { useNavigate } from 'react-router-dom';
import { Deltakelse, Deltaker } from '../../api/types';
import HentDeltakerForm from '../../forms/HentDeltakerForm';

const StartPage = () => {
    const navigate = useNavigate();

    const handleDeltakerFetched = (deltaker: Deltaker) => {
        navigate(`/deltaker/${deltaker.id}`);
    };

    const handleDeltakelseRegistrert = (deltakelse: Deltakelse) => {
        navigate(`/deltaker/${deltakelse.deltaker.id}`);
    };

    return (
        <>
            <HStack align={'center'} justify={'center'} paddingBlock="20">
                <VStack
                    className="rounded-md bg-gray-50 p-8 pt-8 pb-8 items-center w-full drop-shadow-2xl"
                    maxWidth={'30rem'}>
                    <HentDeltakerForm
                        onDeltakerFetched={handleDeltakerFetched}
                        onDeltakelseRegistrert={handleDeltakelseRegistrert}
                    />
                </VStack>
            </HStack>
        </>
    );
};

export default StartPage;
