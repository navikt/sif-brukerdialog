import React from 'react';
import { useIntl } from 'react-intl';
import Box from '@navikt/sif-common-core/lib/components/box/Box';
import intlHelper from '@navikt/sif-common-core/lib/utils/intlUtils';
import SummarySection from '@navikt/sif-common-soknad/lib/soknad-summary/summary-section/SummarySection';
import { BarnStepApiData } from '../../types/SoknadApiData';
import BarnSummaryList from './BarnSummaryList';

interface Props {
    apiValues: BarnStepApiData;
}

const DineBarnSummary: React.FunctionComponent<Props> = ({ apiValues: { barn } }) => {
    const intl = useIntl();
    return (
        <SummarySection
            header={
                barn.length === 1
                    ? intlHelper(intl, 'step.oppsummering.dine-barn.header.ettBarn')
                    : intlHelper(intl, 'step.oppsummering.dine-barn.header.flereBarn')
            }>
            <Box margin="l">
                <BarnSummaryList barn={barn} />
            </Box>
        </SummarySection>
    );
};

export default DineBarnSummary;
