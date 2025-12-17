import { BoxNew, Page } from '@navikt/ds-react';
import { useDeltakelserForDeltaker } from '../../../hooks/useDeltakelserForDeltaker';
import { Deltaker } from '../../../types/Deltaker';
import ErrorPageContent from '../../error-page/ErrorPageContent';
import DeltakerPageContent from './DeltakerPageContent';
import DeltakerPageContentSkeleton from './DeltakerPageSkeleton';

interface Props {
    deltaker: Deltaker;
}

const DeltakelseLoader = ({ deltaker }: Props) => {
    const { data: deltakelser, isLoading, error } = useDeltakelserForDeltaker(deltaker.id || '');

    if (isLoading) {
        return <DeltakerPageContentSkeleton />;
    }

    if (error && !isLoading) {
        return (
            <BoxNew>
                <Page.Block width="xl" gutters={true} className="pt-7 pb-5">
                    <ErrorPageContent error={error} />
                </Page.Block>
            </BoxNew>
        );
    }

    return <DeltakerPageContent deltaker={deltaker} deltakelser={deltakelser || []} />;
};

export default DeltakelseLoader;
