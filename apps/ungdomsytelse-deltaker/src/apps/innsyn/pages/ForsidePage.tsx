import { VStack } from '@navikt/ds-react';
import { setBreadcrumbs } from '@navikt/nav-dekoratoren-moduler';
import { useEffectOnce } from '@navikt/sif-common-hooks';
import { useDeltakerContext } from '../../../hooks/useDeltakerContext';
import DeltakelseContent from '../components/DeltakelseContent';
import UngdomsprogramYtelseHeader from '../components/page-layout/illustrasjon/UngdomsprogramYtelseHeader';
import PageLayout from '../components/page-layout/PageLayout';
import {
    erDeltakelseAvsluttet,
    erDeltakelseStartet,
    visHuskelappOmInntektsrapportering,
} from '../utils/deltakelseUtils';
import Snarveier from '../components/snarveier/Snarveier';

const ForsidePage = () => {
    const { deltakelsePeriode } = useDeltakerContext();

    useEffectOnce(() => {
        setBreadcrumbs([
            { title: 'Min side', url: '/min-side' },
            { title: 'Ungdomsprogramytelse', url: '/', handleInApp: true },
        ]);
    });

    const deltakelseStartet = erDeltakelseStartet(deltakelsePeriode);
    const deltakelseAvsluttet = erDeltakelseAvsluttet(deltakelsePeriode);

    const visInfoOmDeltakelseAvsluttet = deltakelseStartet && deltakelseAvsluttet;
    const visInfoOmInntektsrapportering =
        deltakelseStartet && visHuskelappOmInntektsrapportering() && !deltakelseAvsluttet;

    return (
        <PageLayout documentTitle="Din ungdomsprogramytelse" footer={<Snarveier />}>
            <VStack gap="8">
                <UngdomsprogramYtelseHeader />

                <DeltakelseContent
                    deltakelsePeriode={deltakelsePeriode}
                    visInfoOmDeltakelseAvsluttet={visInfoOmDeltakelseAvsluttet}
                    visInfoOmInntektsrapportering={visInfoOmInntektsrapportering}
                />
            </VStack>
        </PageLayout>
    );
};

export default ForsidePage;
