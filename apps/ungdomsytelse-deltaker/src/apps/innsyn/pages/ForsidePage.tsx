import { VStack } from '@navikt/ds-react';
import { useDeltakerContext } from '../../../context/DeltakerContext';
import InformasjonOmUngdomsytelsen from '../../søknad/components/Informasjon';
import DeltakelseContent from '../components/DeltakelseContent';
import DeltakelseHeader from '../components/DeltakelseHeader';
import Page from '@navikt/sif-common-core-ds/src/components/page/Page';
import { useEffectOnce } from '@navikt/sif-common-hooks';
import { setBreadcrumbs } from '@navikt/nav-dekoratoren-moduler';

const ForsidePage = () => {
    const { deltakelse } = useDeltakerContext();

    useEffectOnce(() => {
        setBreadcrumbs([
            { title: 'Min side', url: '/min-side' },
            { title: 'Ungdomsytelse', url: '/', handleInApp: true },
        ]);
    });

    return (
        <Page title="Din ungdomsytelse">
            <VStack gap="8">
                <DeltakelseHeader deltakelse={deltakelse} />

                <DeltakelseContent deltakelse={deltakelse} />

                <InformasjonOmUngdomsytelsen />
            </VStack>
        </Page>
    );
};

export default ForsidePage;
