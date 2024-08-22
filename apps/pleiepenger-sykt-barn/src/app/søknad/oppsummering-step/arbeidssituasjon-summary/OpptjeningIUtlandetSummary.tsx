import React from 'react';
import { SummaryList } from '@navikt/sif-common-ui';
import { AppText, useAppIntl } from '../../../i18n';
import { OpptjeningIUtlandetApiData } from '../../../types/søknad-api-data/SøknadApiData';
import { FormSummary, List } from '@navikt/ds-react';
import { ISODateToDate, prettifyDateExtended } from '@navikt/sif-common-utils';

export interface Props {
    opptjeningUtland: OpptjeningIUtlandetApiData[];
}

const getPeriodeString = (opptjening: OpptjeningIUtlandetApiData): string => {
    return `${prettifyDateExtended(ISODateToDate(opptjening.fraOgMed))} - ${prettifyDateExtended(ISODateToDate(opptjening.tilOgMed))}`;
};

const OpptjeningIUtlandetSummary: React.FC<Props> = (props) => {
    const { opptjeningUtland } = props;
    const { text } = useAppIntl();
    return (
        <FormSummary.Answer>
            <FormSummary.Label>
                <AppText id="oppsummering.arbeidssituasjon.optjeningIUtlandet.listetittel" />
            </FormSummary.Label>
            <FormSummary.Value>
                <List>
                    <List.Item>
                        {opptjeningUtland.length === 0 ? (
                            <AppText id="oppsummering.arbeidssituasjon.optjeningIUtlandet.nei" />
                        ) : (
                            <AppText id="oppsummering.arbeidssituasjon.optjeningIUtlandet.ja" />
                        )}
                    </List.Item>
                    {opptjeningUtland.length > 0 && (
                        <List.Item
                            title={text(
                                opptjeningUtland.length === 1
                                    ? 'oppsummering.arbeidssituasjon.optjeningIUtlandet.periode'
                                    : 'oppsummering.arbeidssituasjon.optjeningIUtlandet.perioder',
                            )}>
                            <SummaryList<OpptjeningIUtlandetApiData>
                                variant="blocks"
                                items={opptjeningUtland}
                                itemRenderer={(opptjening) => (
                                    <AppText
                                        id="opptjeningIUtlandetSummaryItem.info"
                                        values={{
                                            landnavn: opptjening.land.landnavn,
                                            hva: opptjening.opptjeningType.toLowerCase(),
                                            hvor: opptjening.navn,
                                        }}
                                    />
                                )}
                                itemTitleRenderer={(opptjening) =>
                                    text('opptjeningIUtlandetSummaryItem.periode', {
                                        periode: getPeriodeString(opptjening),
                                    })
                                }
                            />
                        </List.Item>
                    )}
                </List>
            </FormSummary.Value>
        </FormSummary.Answer>
    );
};

export default OpptjeningIUtlandetSummary;
