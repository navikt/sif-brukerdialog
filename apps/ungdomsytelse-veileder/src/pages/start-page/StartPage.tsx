import { BoxNew, HStack, Page } from '@navikt/ds-react';
import { useNavigate } from 'react-router-dom';
import { Deltakelse, Deltaker } from '@navikt/ung-common';
import FinnDeltakerForm from '../../forms/finn-deltaker-form/FinnDeltakerForm';
import { useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';

const StartPage = () => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    useEffect(() => {
        queryClient.resetQueries();
    }, []);

    const handleDeltakerFetched = (deltaker: Deltaker) => {
        navigate(`/deltaker/${deltaker.id}`);
    };

    const handleDeltakelseRegistrert = (deltakelse: Deltakelse) => {
        navigate(`/deltaker/${deltakelse.deltaker.id}`);
    };

    return (
        <BoxNew background="default">
            <Page style={{ minHeight: 'calc(100lvh - 3rem)' }}>
                <Page.Block gutters={true}>
                    <HStack align={'center'} justify={'center'} paddingBlock="20">
                        <FinnDeltakerForm
                            onDeltakerFetched={handleDeltakerFetched}
                            onDeltakelseRegistrert={handleDeltakelseRegistrert}
                        />
                    </HStack>
                </Page.Block>
            </Page>
        </BoxNew>
    );
};

export default StartPage;
