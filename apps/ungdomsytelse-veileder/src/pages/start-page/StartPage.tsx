import { HStack } from '@navikt/ds-react';
import { useNavigate } from 'react-router-dom';
import { Deltakelse, Deltaker } from '@navikt/ung-common';
import FinnDeltakerForm from '../../forms/finn-deltaker-form/FinnDeltakerForm';

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
                <FinnDeltakerForm
                    onDeltakerFetched={handleDeltakerFetched}
                    onDeltakelseRegistrert={handleDeltakelseRegistrert}
                />
            </HStack>
        </>
    );
};

export default StartPage;
