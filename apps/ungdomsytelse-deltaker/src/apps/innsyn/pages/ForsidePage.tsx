import { VStack } from '@navikt/ds-react';
import { UxSignalsPanel } from '@navikt/sif-common-core-ds';

import { useDeltakerContext } from '../../../hooks/useDeltakerContext';
import InnsynAppHeader from '../components/innsyn-app-header/InnsynAppHeader';
import { useInnsynBreadcrumbs } from '../hooks/useInnsynBreadcrumbs';
import DeltakelseContent from '../modules/deltakelse-content/DeltakelseContent';
import ForsidePageLayout from './layout/ForsidePageLayout';
import ForsidePageFooter from './parts/ForsidePageFooter';

const USE_SIGNALS_PANEL = true;

const ForsidePage = () => {
    const { deltakelsePeriode } = useDeltakerContext();

    useInnsynBreadcrumbs();

    return (
        <ForsidePageLayout documentTitle="Din ungdomsprogramytelse" footer={<ForsidePageFooter />}>
            <VStack gap="8">
                <InnsynAppHeader startdato={deltakelsePeriode.programPeriode.from} />
                {USE_SIGNALS_PANEL && <UxSignalsPanel panelId="zpvvyjk4ss" />}
                <DeltakelseContent deltakelsePeriode={deltakelsePeriode} />
            </VStack>
        </ForsidePageLayout>
    );
};

export default ForsidePage;
