import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import intlHelper from '@navikt/sif-common-core/lib/utils/intlUtils';
import FødselsnummerSvar from '@navikt/sif-common-soknad/lib/soknad-summary/FødselsnummerSvar';
import SummaryBlock from '@navikt/sif-common-soknad/lib/soknad-summary/summary-block/SummaryBlock';
import SummarySection from '@navikt/sif-common-soknad/lib/soknad-summary/summary-section/SummarySection';
import { AnnenForelder } from '../../types/SoknadApiData';

interface Props {
    annenForelder: AnnenForelder;
}

const AnnenForelderSummary = ({ annenForelder }: Props) => {
    const intl = useIntl();
    return (
        <SummarySection header={intlHelper(intl, 'step.oppsummering.annenForelder.header')}>
            <SummaryBlock header={annenForelder.navn}>
                <FormattedMessage id="Fødselsnummer" />: <FødselsnummerSvar fødselsnummer={annenForelder.fnr} />
            </SummaryBlock>
        </SummarySection>
    );
};

export default AnnenForelderSummary;
