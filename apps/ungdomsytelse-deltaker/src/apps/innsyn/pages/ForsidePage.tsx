import { VStack } from '@navikt/ds-react';
import { setBreadcrumbs } from '@navikt/nav-dekoratoren-moduler';
import { useEffectOnce } from '@navikt/sif-common-hooks';
import { useDeltakerContext } from '../../../hooks/useDeltakerContext';
import AppHeader from '../components/app-header/AppHeader';
import DeltakelseContent from '../components/DeltakelseContent';
import ForsidePageLayout from '../components/page-layout/ForsidePageLayout';
import Snarveier from '../components/snarveier/Snarveier';
import { YtelseHeader } from '../components/ytelse-header/YtelseHeader';
import { dateFormatter } from '@navikt/sif-common-utils';

const ForsidePage = () => {
    const { deltakelsePeriode } = useDeltakerContext();

    useEffectOnce(() => {
        setBreadcrumbs([
            { title: 'Min side', url: '/min-side' },
            { title: 'Din ungdomsprogramytelse', url: '/', handleInApp: true },
        ]);
    });

    return (
        <ForsidePageLayout documentTitle="Din ungdomsprogramytelse" footer={<Snarveier />}>
            <VStack gap="8">
                <AppHeader
                    title={<YtelseHeader />}
                    description={<>Startdato {dateFormatter.full(deltakelsePeriode.programPeriode.from)}</>}
                />

                <DeltakelseContent deltakelsePeriode={deltakelsePeriode} />
            </VStack>
        </ForsidePageLayout>
    );
};

export default ForsidePage;
