import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import intlHelper from '@navikt/sif-common-core-ds/src/utils/intlUtils';
import SummaryList from '@navikt/sif-common-soknad-ds/src/components/summary-list/SummaryList';
import { renderOpptjeningIUtlandetSummary } from './renderOpptjeningIUtlandetSummary';
import { OpptjeningIUtlandetApiData } from '../../../types/søknad-api-data/SøknadApiData';
import SummaryBlock from '@navikt/sif-common-soknad-ds/src/components/summary-block/SummaryBlock';

export interface Props {
    opptjeningUtland: OpptjeningIUtlandetApiData[];
}

const OpptjeningIUtlandetSummary: React.FC<Props> = (props) => {
    const { opptjeningUtland } = props;
    const intl = useIntl();

    return (
        <SummaryBlock header={intlHelper(intl, 'oppsummering.arbeidssituasjon.optjeningIUtlandet.listetittel')}>
            {opptjeningUtland.length === 0 && (
                <FormattedMessage id="oppsummering.arbeidssituasjon.optjeningIUtlandet.nei" />
            )}
            {opptjeningUtland.length > 0 && (
                <SummaryList items={opptjeningUtland} itemRenderer={renderOpptjeningIUtlandetSummary} />
            )}
        </SummaryBlock>
    );
};

export default OpptjeningIUtlandetSummary;
