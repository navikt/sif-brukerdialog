import { VStack } from '@navikt/ds-react';
import { useDeltakerContext } from '../../../hooks/useDeltakerContext';
import InnsynAppHeader from '../components/innsyn-app-header/InnsynAppHeader';
import DeltakelseContent from '../components/deltakelse-content/DeltakelseContent';
import ForsidePageLayout from './layout/ForsidePageLayout';
import ForsidePageFooter from './parts/ForsidePageFooter';
import { useInnsynBreadcrumbs } from '../hooks/useInnsynBreadcrumbs';

const ForsidePage = () => {
    const { deltakelsePeriode } = useDeltakerContext();

    useInnsynBreadcrumbs();

    return (
        <ForsidePageLayout documentTitle="Din ungdomsprogramytelse" footer={<ForsidePageFooter />}>
            <VStack gap="8">
                <InnsynAppHeader startdato={deltakelsePeriode.programPeriode.from} />
                <div data-uxsignals-embed="panel-zpvvyjk4ss" style={{ maxWidth: '620px' }} />
                <DeltakelseContent deltakelsePeriode={deltakelsePeriode} />
            </VStack>
        </ForsidePageLayout>
    );
};

export default ForsidePage;
