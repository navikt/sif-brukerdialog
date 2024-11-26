import { HStack, Page, VStack } from '@navikt/ds-react';
import HentDeltakerForm from '../../forms/HentDeltakerForm';
import { useNavigate } from 'react-router-dom';
import { Deltaker } from '../../../../api/types';

const StartPage = () => {
    const navigate = useNavigate();

    const handleDeltakerFetched = (deltaker: Deltaker) => {
        navigate(`/deltaker/${deltaker.id}`);
    };

    return (
        <Page className="bg-gray-300">
            <HStack align={'center'} justify={'center'} paddingBlock="20">
                <VStack
                    className="rounded-md bg-gray-100 p-16 pt-8 pb-8 items-center"
                    style={{ outlineColor: '#AAB0BA' }}>
                    <VStack gap="8">
                        <HentDeltakerForm onDeltakerFetched={handleDeltakerFetched} />
                    </VStack>
                </VStack>
            </HStack>
        </Page>
    );
};

export default StartPage;
