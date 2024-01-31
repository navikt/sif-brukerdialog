import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import intlHelper from '@navikt/sif-common-core-ds/src/utils/intlUtils';
import { formatName } from '@navikt/sif-common-core-ds/src/utils/personUtils';
import { SummarySection } from '@navikt/sif-common-ui';
import { Søker } from '../../../types/Søker';

interface Props {
    søker: Søker;
}
const OmSøkerOppsummering: React.FunctionComponent<Props> = ({ søker }) => {
    const intl = useIntl();
    return (
        <SummarySection header={intlHelper(intl, 'steg.oppsummering.søker.header')}>
            <p>
                <strong>{formatName(søker.fornavn, søker.etternavn, søker.mellomnavn)}</strong>
            </p>
            <div>
                <FormattedMessage id="steg.oppsummering.søker.fnr" values={{ fødselsnummer: søker.fødselsnummer }} />
            </div>
        </SummarySection>
    );
};

export default OmSøkerOppsummering;
