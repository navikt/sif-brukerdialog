import { VStack } from '@navikt/ds-react';
import { useDeltakerContext } from '../../../hooks/useDeltakerContext';
import InnsynAppHeader from '../components/innsyn-app-header/InnsynAppHeader';
import DeltakelseContent from '../components/deltakelse-content/DeltakelseContent';
import ForsidePageLayout from './layout/ForsidePageLayout';
import ForsidePageFooter from './parts/ForsidePageFooter';
import { useInnsynBreadcrumbs } from '../hooks/useInnsynBreadcrumbs';
import UxSignalsPanel from '../components/uxsignals-panel/UxSignalsPanel';

const ForsidePage = () => {
    const { deltakelsePeriode } = useDeltakerContext();

    useInnsynBreadcrumbs();

    return (
        <ForsidePageLayout documentTitle="Din ungdomsprogramytelse" footer={<ForsidePageFooter />}>
            <VStack gap="8">
                <InnsynAppHeader startdato={deltakelsePeriode.programPeriode.from} />
                <UxSignalsPanel />
                <DeltakelseContent deltakelsePeriode={deltakelsePeriode} />
            </VStack>
        </ForsidePageLayout>
    );
};

export default ForsidePage;
