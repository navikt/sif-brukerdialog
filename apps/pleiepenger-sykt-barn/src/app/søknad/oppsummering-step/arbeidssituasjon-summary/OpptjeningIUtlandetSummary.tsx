import React from 'react';
import { useAppIntl } from '@i18n/index';
import intlHelper from '@navikt/sif-common-core-ds/src/utils/intlUtils';
import { SummaryBlock, SummaryList } from '@navikt/sif-common-ui';
import { AppText } from '../../../i18n';
import { OpptjeningIUtlandetApiData } from '../../../types/søknad-api-data/SøknadApiData';
import { renderOpptjeningIUtlandetSummary } from './renderOpptjeningIUtlandetSummary';

export interface Props {
    opptjeningUtland: OpptjeningIUtlandetApiData[];
}

const OpptjeningIUtlandetSummary: React.FC<Props> = (props) => {
    const { opptjeningUtland } = props;
    const { intl } = useAppIntl();

    return (
        <div data-testid="arbeidssituasjon-opptjeningUtland">
            <SummaryBlock header={intlHelper(intl, 'oppsummering.arbeidssituasjon.optjeningIUtlandet.listetittel')}>
                {opptjeningUtland.length === 0 && (
                    <div data-testid="oppsummering-opptjeningUtland-nei">
                        <AppText id="oppsummering.arbeidssituasjon.optjeningIUtlandet.nei" />
                    </div>
                )}
                {opptjeningUtland.length > 0 && (
                    <div data-testid="oppsummering-opptjeningUtland">
                        <SummaryList items={opptjeningUtland} itemRenderer={renderOpptjeningIUtlandetSummary} />
                    </div>
                )}
            </SummaryBlock>
        </div>
    );
};

export default OpptjeningIUtlandetSummary;
