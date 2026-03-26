import DeltakelseContent from '@innsyn/components/deltakelse-content/DeltakelseContent';
import { useInnsynBreadcrumbs } from '@innsyn/hooks/useInnsynBreadcrumbs';
import { VStack } from '@navikt/ds-react';
import { dateFormatter } from '@navikt/sif-common-utils';
import { useDeltakerContext } from '@shared/hooks/useDeltakerContext';
import { useAppIntl } from '@shared/i18n';
import { InnsynForsideHeader } from '@sif/ung-ui/components';

import UXRapportertInntekt from '../ux-signals/UXRapportertInntekt';
import ForsidePageLayout from './layout/ForsidePageLayout';
import ForsidePageFooter from './parts/ForsidePageFooter';

const ForsidePage = () => {
    const { text } = useAppIntl();
    const { deltakelsePeriode, oppgaver } = useDeltakerContext();

    useInnsynBreadcrumbs();

    return (
        <ForsidePageLayout documentTitle={text('forsidePage.dokumentTittel')} footer={<ForsidePageFooter />}>
            <VStack gap="space-32">
                <InnsynForsideHeader
                    title={text('innsynAppHeader.ytelseNavn')}
                    subtitle={
                        deltakelsePeriode.harOpphørsvedtak
                            ? undefined
                            : text('innsynAppHeader.startdato', {
                                  dato: dateFormatter.full(deltakelsePeriode.programPeriode.from),
                              })
                    }
                />
                <UXRapportertInntekt />
                <DeltakelseContent deltakelsePeriode={deltakelsePeriode} oppgaver={oppgaver} />
            </VStack>
        </ForsidePageLayout>
    );
};

export default ForsidePage;
