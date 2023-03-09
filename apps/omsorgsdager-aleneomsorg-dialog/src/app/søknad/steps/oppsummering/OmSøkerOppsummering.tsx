import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import intlHelper from '@navikt/sif-common-core-ds/lib/utils/intlUtils';
import { formatName } from '@navikt/sif-common-core-ds/lib/utils/personUtils';
import SummarySection from '@navikt/sif-common-soknad-ds/lib/soknad-summary/summary-section/SummarySection';
import { Søker } from '../../../types/Søker';
import { SummaryBlock } from '@navikt/sif-common-soknad-ds/lib';

interface Props {
    søker: Søker;
}
const OmSøkerOppsummering: React.FC<Props> = ({ søker }) => {
    const intl = useIntl();
    return (
        <SummarySection header={intlHelper(intl, 'step.oppsummering.søker.header')}>
            <SummaryBlock header={formatName(søker.fornavn, søker.etternavn, søker.mellomnavn)}>
                <FormattedMessage id="step.oppsummering.søker.fnr" values={{ fødselsnummer: søker.fødselsnummer }} />
            </SummaryBlock>
        </SummarySection>
    );
};

export default OmSøkerOppsummering;
