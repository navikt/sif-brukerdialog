import { BoxNew, Page, Skeleton } from '@navikt/ds-react';
import { useNavigate, useParams } from 'react-router-dom';
import { validate } from 'uuid';
import AppPage from '../../components/app-page/AppPage';
import DeltakerHeader from '../../components/deltaker-header/DeltakerHeader';
import { useRegistrertDeltaker } from '../../hooks/useRegistrertDeltaker';
import ErrorPage from '../error-page/ErrorPage';
import ErrorPageContent from '../error-page/ErrorPageContent';
import DeltakelseLoader from './parts/DeltakelseLoader';
import { useDocumentTitle } from '@navikt/sif-common-hooks';

type DeltakerPageParams = {
    deltakerId: string;
};

const DeltakerPage = () => {
    const { deltakerId } = useParams<DeltakerPageParams>();
    const navigate = useNavigate();

    useDocumentTitle('Deltaker - Deltakerregistrering - ungdomsprogrammet');

    /** Forenklet feilhåndtering */
    if (!deltakerId || deltakerId === '' || !validate(deltakerId)) {
        return <ErrorPage error="Deltakerident er ikke gyldig" />;
    }

    const { data: deltaker, isLoading: deltakerPending, error } = useRegistrertDeltaker(deltakerId || '');

    return (
        <AppPage>
            {/* Deltaker - spinner */}
            {deltakerPending ? <Skeleton width="100%" height="6.5rem" variant="rectangle" /> : null}

            {/* Error */}
            {error && !deltakerPending ? (
                <BoxNew>
                    <Page.Block width="xl" gutters={true} className="pt-7 pb-5">
                        <ErrorPageContent error={error} />
                    </Page.Block>
                </BoxNew>
            ) : null}

            {/* Deltaker header */}
            {deltaker && (
                <>
                    <BoxNew background="neutral-moderate">
                        <Page.Block width="xl" gutters={true} className="pt-7 pb-5">
                            <DeltakerHeader deltaker={deltaker} onLukkDeltaker={() => navigate('/')} />
                        </Page.Block>
                    </BoxNew>
                    <Page.Block width="xl" gutters={true}>
                        <DeltakelseLoader deltaker={deltaker} />
                    </Page.Block>
                </>
            )}
        </AppPage>
    );
};

export default DeltakerPage;
