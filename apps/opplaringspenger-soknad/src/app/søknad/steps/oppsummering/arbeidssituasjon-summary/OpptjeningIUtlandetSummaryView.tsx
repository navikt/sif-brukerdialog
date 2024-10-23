import { FormSummary, Heading, List } from '@navikt/ds-react';
import React from 'react';
import { ISODateToDate, prettifyDateExtended } from '@navikt/sif-common-utils';
import { AppText, useAppIntl } from '../../../../i18n';
import { OpptjeningIUtlandetApi } from '../../../../types/søknadApiData/SøknadApiData';
import { SummaryList } from '@navikt/sif-common-ui';

export interface Props {
    opptjeningUtland: OpptjeningIUtlandetApi[];
}

const getPeriode = (opptjening: OpptjeningIUtlandetApi): string => {
    return `${prettifyDateExtended(ISODateToDate(opptjening.fraOgMed))} - ${prettifyDateExtended(ISODateToDate(opptjening.tilOgMed))}`;
};

const OpptjeningIUtlandetSummaryView: React.FC<Props> = (props) => {
    const { opptjeningUtland } = props;
    const { text } = useAppIntl();
    return (
        <>
            <FormSummary.Answer>
                <FormSummary.Label>
                    <Heading level="3" size="small">
                        <AppText id="oppsummering.arbeidssituasjon.optjeningIUtlandet.tittel" />
                    </Heading>
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
                                <SummaryList<OpptjeningIUtlandetApi>
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
                                            periode: getPeriode(opptjening),
                                        })
                                    }
                                />
                            </List.Item>
                        )}
                    </List>
                </FormSummary.Value>
            </FormSummary.Answer>
        </>
    );
};

export default OpptjeningIUtlandetSummaryView;
