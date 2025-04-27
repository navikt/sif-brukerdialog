import { BoxNew, Page } from '@navikt/ds-react';
import { useNavigate, useParams } from 'react-router-dom';
import { validate } from 'uuid';
import AppPage from '../../components/app-page/AppPage';
import DeltakerHeader from '../../components/deltaker-header/DeltakerHeader';
import { useDeltakelserForDeltaker } from '../../hooks/useDeltakelserForDeltaker';
import { useRegistrertDeltaker } from '../../hooks/useRegistrertDeltaker';
import ErrorPage from '../error-page/ErrorPage';
import ErrorPageContent from '../error-page/ErrorPageContent';
import DeltakerPageContent from './DeltakerPageContent';
import LoadIndicator from '../../components/loader-indicator/LoadIndicator';

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
    const pending = deltakerPending || deltakelserPending;

    return (
        <AppPage>
            {/* Deltaker - spinner */}
            {deltakerPending ? <LoadIndicator title="Henter deltaker" /> : null}

            {/* Deltaker header */}
            {deltaker && (
                <BoxNew background="neutral-moderate">
                    <Page.Block width="xl" gutters={true} className="pt-7 pb-5">
                        <DeltakerHeader deltaker={deltaker} onLukkDeltaker={() => navigate('/')} />
                    </Page.Block>
                </BoxNew>
            )}

            {/* Error */}
            {error && !pending ? (
                <BoxNew>
                    <Page.Block width="xl" gutters={true} className="pt-7 pb-5">
                        <ErrorPageContent error={error} />
                    </Page.Block>
                </BoxNew>
            ) : null}

            {/* Deltakelser - spinner */}
            {!deltakerPending && deltakelserPending ? <LoadIndicator size="small" title="Henter deltakelser" /> : null}

            {/* Deltakelser - innhold*/}
            {deltakelser && deltaker ? (
                <Page.Block width="xl" gutters={true}>
                    <DeltakerPageContent deltaker={deltaker} deltakelser={deltakelser} />
                </Page.Block>
            ) : null}
        </AppPage>
    );
};

export default DeltakerPage;
