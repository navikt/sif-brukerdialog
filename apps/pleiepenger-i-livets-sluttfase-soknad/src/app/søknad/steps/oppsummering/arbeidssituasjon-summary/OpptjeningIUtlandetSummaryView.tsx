import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { renderOpptjeningIUtlandetSummary } from './renderOpptjeningIUtlandetSummary';
import { OpptjeningIUtlandetApi } from '../../../../types/søknadApiData/SøknadApiData';
import { SummaryBlock } from '@navikt/sif-common-soknad-ds';
import intlHelper from '@navikt/sif-common-core-ds/lib/utils/intlUtils';

export interface Props {
    opptjeningUtland: OpptjeningIUtlandetApi[];
}

const OpptjeningIUtlandetSummaryView: React.FC<Props> = (props) => {
    const { opptjeningUtland } = props;
    const intl = useIntl();

    return (
        <>
            <SummaryBlock header={intlHelper(intl, 'oppsummering.arbeidssituasjon.optjeningIUtlandet.listetittel')}>
                {opptjeningUtland.length === 0 && (
                    <FormattedMessage id="oppsummering.arbeidssituasjon.optjeningIUtlandet.nei" />
                )}
                {opptjeningUtland.length > 0 && (
                    <ul>
                        {opptjeningUtland.map((opptjening, index) => (
                            <li key={index}>{renderOpptjeningIUtlandetSummary(opptjening)}</li>
                        ))}
                    </ul>
                )}
            </SummaryBlock>
        </>
    );
};

export default OpptjeningIUtlandetSummaryView;
