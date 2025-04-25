import { Box, HStack, Page } from '@navikt/ds-react';
import { useNavigate, useParams } from 'react-router-dom';
import LoadingSpinner from '@navikt/sif-common-core-ds/src/atoms/loading-spinner/LoadingSpinner';
import DeltakerHeader from '../../components/deltaker-header/DeltakerHeader';
import { useDeltakelserForDeltaker } from '../../hooks/useDeltakelserForDeltaker';
import { useRegistrertDeltaker } from '../../hooks/useRegistrertDeltaker';
import ErrorPageContent from '../error-page/ErrorPageContent';
import DeltakerPageContent from './DeltakerPageContent';

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
            <HStack paddingBlock={'10'} paddingInline={'6'} justify="center">
                <LoadingSpinner size="3xlarge" title="Henter deltaker" />
            </HStack>
        );
    }

    const error = [deltakerError, deltakelserError].find((e) => e && e !== null);

    if (error) {
        return (
            <Page.Block width="xl" gutters={true}>
                <Box className="bg-white rounded-b-lg p-3">
                    <ErrorPageContent error={error} />
                </Box>
            </Page.Block>
        );
    }

    if (deltakelser && deltaker) {
        return (
            <Page.Block width="xl" gutters={true}>
                <Box className="rounded-lg">
                    <DeltakerHeader deltaker={deltaker} onLukkDeltaker={closeDeltaker} />
                    <Box className="bg-white rounded-b-lg p-3 pr-6 pl-6">
                        <DeltakerPageContent deltaker={deltaker} deltakelser={deltakelser} />
                    </Box>
                </Box>
            </Page.Block>
        );
    }
};

export default DeltakerPage;
