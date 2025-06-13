import { BoxNew, HStack, Page } from '@navikt/ds-react';
import { useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDocumentTitle } from '@navikt/sif-common-hooks';
import { Deltakelse, Deltaker } from '@navikt/ung-common';
import BorderBox from '../../atoms/BorderBox';
import AppPage from '../../components/app-page/AppPage';
import FinnDeltakerForm from '../../forms/finn-deltaker-form/FinnDeltakerForm';

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
                        <BorderBox className="p-8 pt-8 pb-14 items-center w-full" maxWidth="30rem">
                            <FinnDeltakerForm
                                onDeltakerFetched={handleDeltakerFetched}
                                onDeltakelseRegistrert={handleDeltakelseRegistrert}
                            />
                            {/* <button
                                className="p-2 bg-blue-600 text-white rounded"
                                onClick={() =>
                                    openDrawer(<ArticleContent articleList={articleList} />, { title: 'Informasjon' })
                                }>
                                Åpne Drawer
                            </button> */}
                        </BorderBox>
                    </HStack>
                </Page.Block>
            </AppPage>
        </BoxNew>
    );
};

export default StartPage;
