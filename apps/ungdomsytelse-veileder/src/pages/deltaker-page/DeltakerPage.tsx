import { Box, HStack, Page } from '@navikt/ds-react';
import { useNavigate, useParams } from 'react-router-dom';
import LoadingSpinner from '@navikt/sif-common-core-ds/src/atoms/loading-spinner/LoadingSpinner';
import DeltakerHeader from '../../components/deltaker-header/DeltakerHeader';
import { useDeltakelserForDeltaker } from '../../hooks/useDeltakelserForDeltaker';
import { useRegistrertDeltaker } from '../../hooks/useRegistrertDeltaker';
import ErrorPageContent from '../error-page/ErrorPageContent';
import DeltakerPageContent from './DeltakerPageContent';
import DeltakerPageFooter from './parts/DeltakerPageFooter';

type DeltakerPageParams = {
    deltakerId: string;
};

const DeltakerPage = () => {
    const { deltakerId } = useParams<DeltakerPageParams>();
    const navigate = useNavigate();

    if (!deltakerId) {
        return <div>Ingen deltakerId</div>;
    }

    const {
        data: deltaker,
        isLoading: deltakerPending,
        error: deltakerError,
    } = useRegistrertDeltaker(deltakerId || '');

    const {
        data: deltakelser,
        isLoading: deltakelserPending,
        error: deltakelserError,
    } = useDeltakelserForDeltaker(deltakerId || '');

    const closeDeltaker = () => {
        navigate('/');
    };

    if (deltakerPending || deltakelserPending) {
        return (
            <Page>
                <HStack paddingBlock={'10'} paddingInline={'6'} justify="center">
                    <LoadingSpinner size="3xlarge" title="Henter deltaker" />
                </HStack>
            </Page>
        );
    }

    const error = [deltakerError, deltakelserError].find((e) => e && e !== null);

    if (error) {
        return (
            <Page>
                <Page.Block width="xl" gutters={true}>
                    <Box className="bg-white rounded-b-lg p-3">
                        <ErrorPageContent error={error} />
                    </Box>
                </Page.Block>
            </Page>
        );
    }

    if (deltakelser && deltaker) {
        return (
            <Page>
                <Page.Block width="xl" gutters={true} className="pt-7 pb-5 bg-deepblue-100">
                    <DeltakerHeader deltaker={deltaker} onLukkDeltaker={closeDeltaker} />
                </Page.Block>
                <Page.Block width="xl" gutters={true}>
                    <DeltakerPageContent deltaker={deltaker} deltakelser={deltakelser} />
                </Page.Block>
                <Page.Block width="xl" gutters={true}>
                    <DeltakerPageFooter />
                </Page.Block>
            </Page>
        );
    }
};

export default DeltakerPage;
