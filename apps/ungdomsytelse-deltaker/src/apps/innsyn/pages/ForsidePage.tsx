import { VStack } from '@navikt/ds-react';
import { useDeltakerContext } from '../../../hooks/useDeltakerContext';
import InnsynAppHeader from '../components/innsyn-app-header/InnsynAppHeader';
import DeltakelseContent from '../components/DeltakelseContent';
import ForsidePageLayout from '../components/page-layout/ForsidePageLayout';
import Snarveier from '../components/snarveier/Snarveier';
import { useInnsynBreadcrumbs } from '../hooks/useInnsynBreadcrumbs';

const ForsidePage = () => {
    const { deltakelsePeriode } = useDeltakerContext();

    useInnsynBreadcrumbs();

    return (
        <ForsidePageLayout documentTitle="Din ungdomsprogramytelse" footer={<Snarveier />}>
            <VStack gap="8">
                <InnsynAppHeader startdato={deltakelsePeriode.programPeriode.from} />

                <DeltakelseContent deltakelsePeriode={deltakelsePeriode} />
            </VStack>
        </ForsidePageLayout>
    );
};

export default ForsidePage;
