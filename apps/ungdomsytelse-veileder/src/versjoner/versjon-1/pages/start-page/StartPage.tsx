import { HStack, Page } from '@navikt/ds-react';
import { useNavigate } from 'react-router-dom';
import { Deltaker, NyDeltaker } from '../../../../api/types';
import { useState } from 'react';
import HentDeltakerDialog from '../../components/HentDeltakerDialog';
import RegistrerDeltakerDialog from '../../components/RegistrerDeltakerDialog';

const StartPage = () => {
    const navigate = useNavigate();
    const [nyDeltaker, setNyDeltaker] = useState<NyDeltaker | null>(null);

    const handleDeltakerFetched = (deltaker: Deltaker) => {
        navigate(`/deltaker/${deltaker.id}`);
    };

    const handleOnNyDeltaker = (deltaker: NyDeltaker) => {
        setNyDeltaker(deltaker);
        console.log(deltaker);
        // navigate(`/deltaker/ny`);
    };

    return (
        <Page className="bg-gray-300">
            <HStack align={'center'} justify={'center'} paddingBlock="20">
                {nyDeltaker ? (
                    <RegistrerDeltakerDialog nyDeltaker={nyDeltaker} />
                ) : (
                    <HentDeltakerDialog onDeltakerFetched={handleDeltakerFetched} onNyDeltaker={handleOnNyDeltaker} />
                )}
            </HStack>
        </Page>
    );
};

export default StartPage;
