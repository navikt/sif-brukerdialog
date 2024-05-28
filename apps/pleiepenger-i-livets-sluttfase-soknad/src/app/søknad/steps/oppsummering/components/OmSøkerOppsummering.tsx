import React from 'react';
import { formatName } from '@navikt/sif-common-core-ds/src/utils/personUtils';
import { SummaryBlock, SummarySection } from '@navikt/sif-common-ui';
import { Søker } from '../../../../types/Søker';
import { AppText, useAppIntl } from '../../../../i18n';

interface Props {
    søker: Søker;
}
const OmSøkerOppsummering: React.FC<Props> = ({ søker }) => {
    const { text } = useAppIntl();
    return (
        <SummarySection header={text('step.oppsummering.søker.header')}>
            <SummaryBlock header={formatName(søker.fornavn, søker.etternavn, søker.mellomnavn)}>
                <AppText id="step.oppsummering.søker.fnr" values={{ fødselsnummer: søker.fødselsnummer }} />
            </SummaryBlock>
        </SummarySection>
    );
};

export default OmSøkerOppsummering;
