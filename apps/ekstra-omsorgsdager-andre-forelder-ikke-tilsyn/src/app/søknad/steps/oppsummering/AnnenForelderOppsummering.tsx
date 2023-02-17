import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import intlHelper from '@navikt/sif-common-core-ds/lib/utils/intlUtils';
import FødselsnummerSvar from '@navikt/sif-common-soknad-ds/lib/soknad-summary/FødselsnummerSvar';
import SummaryBlock from '@navikt/sif-common-soknad-ds/lib/soknad-summary/summary-block/SummaryBlock';
import SummarySection from '@navikt/sif-common-soknad-ds/lib/soknad-summary/summary-section/SummarySection';
import { AnnenForelderApiData } from '../../../types/søknadApiData/SøknadApiData';

interface Props {
    annenForelder: AnnenForelderApiData;
}

const AnnenForelderOppsummering = ({ annenForelder }: Props) => {
    const intl = useIntl();
    return (
        <SummarySection header={intlHelper(intl, 'step.oppsummering.annenForelder.header')}>
            <SummaryBlock header={annenForelder.navn}>
                <FormattedMessage id="Fødselsnummer" />: <FødselsnummerSvar fødselsnummer={annenForelder.fnr} />
            </SummaryBlock>
        </SummarySection>
    );
};

export default AnnenForelderOppsummering;
