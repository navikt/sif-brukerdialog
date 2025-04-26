import { BoxNew, HStack, Page } from '@navikt/ds-react';
import { useNavigate, useParams } from 'react-router-dom';
import LoadingSpinner from '@navikt/sif-common-core-ds/src/atoms/loading-spinner/LoadingSpinner';
import DeltakerHeader from '../../components/deltaker-header/DeltakerHeader';
import { useDeltakelserForDeltaker } from '../../hooks/useDeltakelserForDeltaker';
import { useRegistrertDeltaker } from '../../hooks/useRegistrertDeltaker';
import ErrorPageContent from '../error-page/ErrorPageContent';
import DeltakerPageContent from './DeltakerPageContent';
import AppFooter from '../../components/app-footer/AppFooter';

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
        // eslint-disable-next-line react-hooks/rules-of-hooks
    } = useRegistrertDeltaker(deltakerId || '');

    const {
        data: deltakelser,
        isLoading: deltakelserPending,
        error: deltakelserError,
        // eslint-disable-next-line react-hooks/rules-of-hooks
    } = useDeltakelserForDeltaker(deltakerId || '');

    const closeDeltaker = () => {
        navigate('/');
    };

    if (deltakerPending || deltakelserPending) {
        return (
            <HStack paddingBlock="10" paddingInline="6" justify="center">
                <LoadingSpinner size="3xlarge" title="Henter deltaker" />
            </HStack>
        );
    }

    const error = [deltakerError, deltakelserError].find((e) => e && e !== null);

    const renderContent = () => {
        if (error) {
            return (
                <BoxNew background="info-moderateA" borderRadius="medium" marginBlock="3">
                    <ErrorPageContent error={error} />
                </BoxNew>
            );
        }

        if (deltakelser && deltaker) {
            return (
                <>
                    <BoxNew background="neutral-moderate">
                        <Page.Block width="xl" gutters={true} className="pt-7 pb-5">
                            <DeltakerHeader deltaker={deltaker} onLukkDeltaker={closeDeltaker} />
                        </Page.Block>
                    </BoxNew>
                    <Page.Block width="xl" gutters={true}>
                        <DeltakerPageContent deltaker={deltaker} deltakelser={deltakelser} />
                    </Page.Block>
                </>
            );
        }
    };

    return (
        <Page style={{ minHeight: 'calc(100lvh - 3rem)' }} footer={<AppFooter />}>
            {renderContent()}
        </Page>
    );
};

export default DeltakerPage;
