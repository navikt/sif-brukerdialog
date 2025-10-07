import ForsideHeader from '@innsyn/components/forside-header/ForsideHeader';
import { useInnsynBreadcrumbs } from '@innsyn/hooks/useInnsynBreadcrumbs';
import DeltakelseContent from '@innsyn/modules/deltakelse-content/DeltakelseContent';
import { VStack } from '@navikt/ds-react';
import { useDeltakerContext } from '@shared/hooks/useDeltakerContext';
import { useAppIntl } from '@shared/i18n';

import ForsidePageLayout from './layout/ForsidePageLayout';
import ForsidePageFooter from './parts/ForsidePageFooter';

const ForsidePage = () => {
    const { text } = useAppIntl();
    const { deltakelsePeriode } = useDeltakerContext();

    useInnsynBreadcrumbs();

    return (
        <ForsidePageLayout documentTitle={text('forsidePage.dokumentTittel')} footer={<ForsidePageFooter />}>
            <VStack gap="8">
                <ForsideHeader startdato={deltakelsePeriode.programPeriode.from} />
                {/* <UXRapportertInntekt /> */}
                <DeltakelseContent deltakelsePeriode={deltakelsePeriode} />
            </VStack>
        </ForsidePageLayout>
    );
};

export default ForsidePage;
