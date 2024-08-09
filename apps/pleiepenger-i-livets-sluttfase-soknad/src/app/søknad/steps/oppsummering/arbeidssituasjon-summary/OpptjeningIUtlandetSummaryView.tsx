import { FormSummary } from '@navikt/ds-react';
import React from 'react';
import { ISODateToDate, prettifyDateExtended } from '@navikt/sif-common-utils';
import { AppText } from '../../../../i18n';
import { OpptjeningIUtlandetApi } from '../../../../types/søknadApiData/SøknadApiData';
import './opptjeningIUtlandetSummaryItem.css';
export interface Props {
    opptjeningUtland: OpptjeningIUtlandetApi[];
}

const OpptjeningIUtlandetSummaryView: React.FC<Props> = (props) => {
    const { opptjeningUtland } = props;

    return (
        <>
            <FormSummary.Answer>
                <FormSummary.Label>
                    <AppText id="oppsummering.arbeidssituasjon.optjeningIUtlandet.listetittel" />
                </FormSummary.Label>
                <FormSummary.Value>
                    {opptjeningUtland.length === 0 && (
                        <AppText id="oppsummering.arbeidssituasjon.optjeningIUtlandet.nei" />
                    )}
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
                </FormSummary.Value>
            </FormSummary.Answer>
        </>
    );
};

export default OpptjeningIUtlandetSummaryView;
