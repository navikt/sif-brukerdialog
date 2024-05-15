import React from 'react';
import { SummaryBlock } from '@navikt/sif-common-ui';
import { ISODateToDate, prettifyDateExtended } from '@navikt/sif-common-utils';
import { AppText, useAppIntl } from '../../../../i18n';
import { OpptjeningIUtlandetApi } from '../../../../types/søknadApiData/SøknadApiData';

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
                            <li key={index}>
                                <div className={'opptjeningIUtlandetSummaryItem'}>
                                    <span className={'opptjeningIUtlandetSummaryItem__dates'}>
                                        {prettifyDateExtended(ISODateToDate(opptjening.fraOgMed))} -{' '}
                                        {prettifyDateExtended(ISODateToDate(opptjening.tilOgMed))}
                                    </span>
                                    <span>
                                        <AppText
                                            id="opptjeningIUtlandetSummaryItem.info"
                                            values={{
                                                landnavn: opptjening.land.landnavn,
                                                hva: opptjening.opptjeningType.toLowerCase(),
                                                hvor: opptjening.navn,
                                            }}
                                        />
                                    </span>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </SummaryBlock>
        </>
    );
};

export default OpptjeningIUtlandetSummaryView;
