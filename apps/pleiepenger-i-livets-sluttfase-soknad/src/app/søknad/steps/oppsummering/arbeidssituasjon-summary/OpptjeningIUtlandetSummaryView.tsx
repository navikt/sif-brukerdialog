import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { renderOpptjeningIUtlandetSummary } from './renderOpptjeningIUtlandetSummary';
import { OpptjeningIUtlandetApi } from '../../../../types/søknadApiData/SøknadApiData';
import { SummaryBlock, SummaryList } from '@navikt/sif-common-soknad-ds';
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
                    <SummaryList items={opptjeningUtland} itemRenderer={renderOpptjeningIUtlandetSummary} />
                )}
            </SummaryBlock>
        </>
    );
};

export default OpptjeningIUtlandetSummaryView;
