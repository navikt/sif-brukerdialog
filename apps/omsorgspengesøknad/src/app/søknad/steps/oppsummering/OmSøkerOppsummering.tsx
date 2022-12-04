import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import Block from '@navikt/sif-common-core-ds/lib/components/block/Block';
import intlHelper from '@navikt/sif-common-core-ds/lib/utils/intlUtils';
import { formatName } from '@navikt/sif-common-core-ds/lib/utils/personUtils';
import SummarySection from '@navikt/sif-common-soknad-ds/lib/soknad-summary/summary-section/SummarySection';
import { Søker } from '../../../types/Søker';

interface Props {
    søker: Søker;
}
const OmSøkerOppsummering: React.FunctionComponent<Props> = ({ søker }) => {
    const intl = useIntl();
    return (
        <SummarySection header={intlHelper(intl, 'steg.oppsummering.søker.header')}>
            <Block margin="l">
                <div>
                    <strong>{formatName(søker.fornavn, søker.etternavn, søker.mellomnavn)}</strong>
                </div>
                <FormattedMessage id="steg.oppsummering.søker.fnr" values={{ fødselsnummer: søker.fødselsnummer }} />
            </Block>
        </SummarySection>
    );
};

export default OmSøkerOppsummering;
