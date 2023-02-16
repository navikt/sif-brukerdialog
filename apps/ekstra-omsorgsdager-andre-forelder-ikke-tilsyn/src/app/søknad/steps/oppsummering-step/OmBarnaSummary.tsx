import React from 'react';
import { useIntl } from 'react-intl';
import intlHelper from '@navikt/sif-common-core/lib/utils/intlUtils';
import SummarySection from '@navikt/sif-common-soknad/lib/soknad-summary/summary-section/SummarySection';
import { SøknadApiData } from '../../../types/søknadApiData/SøknadApiData';
import Box from '@navikt/sif-common-core/lib/components/box/Box';
import BarnSummaryList from './BarnSummaryList';

interface Props {
    apiValues: SøknadApiData;
}

const OmBarnaSummary = ({ apiValues: { barn } }: Props) => {
    const intl = useIntl();

    return (
        <SummarySection header={intlHelper(intl, 'step.oppsummering.deres-felles-barn.header')}>
            <Box margin="l">
                <BarnSummaryList barn={barn} />
            </Box>
        </SummarySection>
    );
};

export default OmBarnaSummary;
