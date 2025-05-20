import { VStack } from '@navikt/ds-react';
import { setBreadcrumbs } from '@navikt/nav-dekoratoren-moduler';
import { useEffectOnce } from '@navikt/sif-common-hooks';
import { useDeltakerContext } from '../../../hooks/useDeltakerContext';
import DeltakelseContent from '../components/DeltakelseContent';
import UngdomsprogramYtelseHeader from '../components/page-layout/illustrasjon/UngdomsprogramYtelseHeader';
import PageLayout from '../components/page-layout/PageLayout';

const ForsidePage = () => {
    const { deltakelsePeriode } = useDeltakerContext();

    useEffectOnce(() => {
        setBreadcrumbs([
            { title: 'Min side', url: '/min-side' },
            { title: 'Ungdomsytelse', url: '/', handleInApp: true },
        ]);
    });

    return (
        <PageLayout documentTitle="Din ungdomsprogramytelse">
            <VStack gap="12">
                <UngdomsprogramYtelseHeader />

                <DeltakelseContent deltakelsePeriode={deltakelsePeriode} />
            </VStack>
        </PageLayout>
    );
};

export default ForsidePage;
