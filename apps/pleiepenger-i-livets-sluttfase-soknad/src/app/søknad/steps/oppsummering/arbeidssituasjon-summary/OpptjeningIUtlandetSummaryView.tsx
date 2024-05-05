import React from 'react';
import { renderOpptjeningIUtlandetSummary } from './renderOpptjeningIUtlandetSummary';
import { OpptjeningIUtlandetApi } from '../../../../types/søknadApiData/SøknadApiData';
import { SummaryBlock } from '@navikt/sif-common-ui';
import { AppText, useAppIntl } from '../../../../i18n';

export interface Props {
    opptjeningUtland: OpptjeningIUtlandetApi[];
}

const OpptjeningIUtlandetSummaryView: React.FC<Props> = (props) => {
    const { opptjeningUtland } = props;
    const { text } = useAppIntl();

    return (
        <>
            <SummaryBlock header={text('oppsummering.arbeidssituasjon.optjeningIUtlandet.listetittel')}>
                {opptjeningUtland.length === 0 && <AppText id="oppsummering.arbeidssituasjon.optjeningIUtlandet.nei" />}
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
