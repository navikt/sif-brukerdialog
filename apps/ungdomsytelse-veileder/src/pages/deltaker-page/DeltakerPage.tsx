import { BoxNew, Heading, HStack, Page, VStack } from '@navikt/ds-react';
import { useNavigate, useParams } from 'react-router-dom';
import LoadingSpinner from '@navikt/sif-common-core-ds/src/atoms/loading-spinner/LoadingSpinner';
import { validate } from 'uuid';
import AppPage from '../../components/app-page/AppPage';
import BorderBox from '../../components/border-box/BorderBox';
import DeltakerHeader from '../../components/deltaker-header/DeltakerHeader';
import { useDeltakelserForDeltaker } from '../../hooks/useDeltakelserForDeltaker';
import { useRegistrertDeltaker } from '../../hooks/useRegistrertDeltaker';
import ErrorPage from '../error-page/ErrorPage';
import ErrorPageContent from '../error-page/ErrorPageContent';
import DeltakerPageContent from './DeltakerPageContent';

type DeltakerPageParams = {
    deltakerId: string;
};

const DeltakerPage = () => {
    const { deltakerId } = useParams<DeltakerPageParams>();
    const navigate = useNavigate();

    /** Forenklet feilhåndtering */
    if (!deltakerId || deltakerId === '' || !validate(deltakerId)) {
        return <ErrorPage error="Deltakerident er ikke gyldig" />;
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

    const error = [deltakerError, deltakelserError].find((e) => e && e !== null);

    return (
        <AppPage>
            {/* Loading */}
            {deltakerPending || deltakelserPending ? (
                <HStack paddingBlock="32 0" paddingInline="6" justify="center">
                    <BorderBox padding="12">
                        <VStack gap="5">
                            <HStack align="center" justify="center">
                                <LoadingSpinner size="3xlarge" title="Henter deltaker" />
                            </HStack>
                            <Heading level="2" size="medium" align="center">
                                Henter deltaker
                            </Heading>
                        </VStack>
                    </BorderBox>
                </HStack>
            ) : null}

            {/* Error */}
            {error ? (
                <BoxNew>
                    <Page.Block width="xl" gutters={true} className="pt-7 pb-5">
                        <ErrorPageContent error={error} />
                    </Page.Block>
                </BoxNew>
            ) : null}

            {/* Content */}
            {deltakelser && deltaker ? (
                <>
                    <BoxNew background="neutral-moderate">
                        <Page.Block width="xl" gutters={true} className="pt-7 pb-5">
                            <DeltakerHeader deltaker={deltaker} onLukkDeltaker={() => navigate('/')} />
                        </Page.Block>
                    </BoxNew>
                    <Page.Block width="xl" gutters={true}>
                        <DeltakerPageContent deltaker={deltaker} deltakelser={deltakelser} />
                    </Page.Block>
                </>
            ) : null}
        </AppPage>
    );
};

export default DeltakerPage;
