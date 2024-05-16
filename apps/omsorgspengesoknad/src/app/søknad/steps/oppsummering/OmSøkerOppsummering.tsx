import React from 'react';
import { formatName } from '@navikt/sif-common-core-ds/src/utils/personUtils';
import { SummarySection } from '@navikt/sif-common-ui';
import { AppText, useAppIntl } from '../../../i18n';
import { Søker } from '../../../types/Søker';

interface Props {
    søker: Søker;
}
const OmSøkerOppsummering: React.FunctionComponent<Props> = ({ søker }) => {
    const { text } = useAppIntl();
    return (
        <SummarySection header={text('steg.oppsummering.søker.header')}>
            <p>
                <strong>{formatName(søker.fornavn, søker.etternavn, søker.mellomnavn)}</strong>
            </p>
            <div>
                <AppText id="steg.oppsummering.søker.fnr" values={{ fødselsnummer: søker.fødselsnummer }} />
            </div>
        </SummarySection>
    );
};

export default OmSøkerOppsummering;
