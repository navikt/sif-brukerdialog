import { VStack } from '@navikt/ds-react';
import { setBreadcrumbs } from '@navikt/nav-dekoratoren-moduler';
import { useEffectOnce } from '@navikt/sif-common-hooks';
import { useDeltakerContext } from '../../../hooks/useDeltakerContext';
import DeltakelseContent from '../components/DeltakelseContent';
import ForsidePageLayout from '../components/page-layout/ForsidePageLayout';
import Snarveier from '../components/snarveier/Snarveier';
import AppHeader from '../components/app-header/AppHeader';

const ForsidePage = () => {
    const { deltakelsePeriode } = useDeltakerContext();

    useEffectOnce(() => {
        setBreadcrumbs([
            { title: 'Min side', url: '/min-side' },
            { title: 'Ditt ungdomsprogram', url: '/', handleInApp: true },
        ]);
    });

    return (
        <ForsidePageLayout documentTitle="Ditt ungdomsprogram" footer={<Snarveier />}>
            <VStack gap="8">
                <AppHeader title="Ditt ungdomsprogram" description="Oversikt over ytelsen din" />

                <DeltakelseContent deltakelsePeriode={deltakelsePeriode} />
            </VStack>
        </ForsidePageLayout>
    );
};

export default ForsidePage;
