import { VStack } from '@navikt/ds-react';
import { setBreadcrumbs } from '@navikt/nav-dekoratoren-moduler';
import Page from '@navikt/sif-common-core-ds/src/components/page/Page';
import { useEffectOnce } from '@navikt/sif-common-hooks';
import { useDeltakerContext } from '../../../hooks/useDeltakerContext';
import InformasjonOmUngdomsytelsen from '../../søknad/components/Informasjon';
import DeltakelseContent from '../components/DeltakelseContent';
import DeltakelseHeader from '../components/DeltakelseHeader';

const ForsidePage = () => {
    const { deltakelsePeriode } = useDeltakerContext();

    useEffectOnce(() => {
        setBreadcrumbs([
            { title: 'Min side', url: '/min-side' },
            { title: 'Ungdomsytelse', url: '/', handleInApp: true },
        ]);
    });

    return (
        <Page title="Din ungdomsytelse">
            <VStack gap="8">
                <DeltakelseHeader deltakelsePeriode={deltakelsePeriode} />

                <DeltakelseContent deltakelsePeriode={deltakelsePeriode} />

                <InformasjonOmUngdomsytelsen />
            </VStack>
        </Page>
    );
};

export default ForsidePage;
