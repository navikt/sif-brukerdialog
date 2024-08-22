import { FormSummary, Heading } from '@navikt/ds-react';
import { useAppIntl } from '@i18n/index';
import { AppText } from '../../../i18n';
import { SelvstendigApiData } from '../../../types/søknad-api-data/SøknadApiData';
import NormalarbeidstidSummary from './NormalarbeidstidSummary';
import { List } from '@navikt/ds-react/List';
import VirksomhetFormSummaryAnswers from '@navikt/sif-common-forms-ds/src/forms/virksomhet/VirksomhetFormSummary';

interface Props {
    selvstendig: SelvstendigApiData;
}

function ArbeidssituasjonSelvstendigSummary({ selvstendig }: Props) {
    const { text } = useAppIntl();

    return (
        <FormSummary.Answer>
            <FormSummary.Label>
                <Heading level="3" size="small">
                    <AppText id="oppsummering.arbeidssituasjon.selvstendig.header" />
                </Heading>
            </FormSummary.Label>
            <FormSummary.Value>
                <List>
                    {selvstendig.harInntektSomSelvstendig === false ? (
                        <List.Item>
                            <AppText id={'oppsummering.arbeidssituasjon.selvstendig.erIkkeSN'} />
                        </List.Item>
                    ) : (
                        <>
                            <List.Item>
                                <AppText id="oppsummering.arbeidssituasjon.selvstendig.erSn" />
                            </List.Item>
                            <List.Item>
                                {selvstendig.virksomhet.harFlereAktiveVirksomheter ? (
                                    <AppText id="oppsummering.arbeidssituasjon.selvstendig.flereVirksomheter" />
                                ) : (
                                    <AppText id="oppsummering.arbeidssituasjon.selvstendig.enVirksomhet" />
                                )}
                            </List.Item>
                            <List.Item>
                                <NormalarbeidstidSummary
                                    normalarbeidstidApiData={selvstendig.arbeidsforhold.normalarbeidstid}
                                    erAnsatt={true}
                                />
                            </List.Item>
                            <List.Item title={text('summary.virksomhet.virksomhetInfo.tittel')}>
                                <VirksomhetFormSummaryAnswers virksomhet={selvstendig.virksomhet} />
                            </List.Item>
                        </>
                    )}
                </List>
            </FormSummary.Value>
        </FormSummary.Answer>
    );
}

export default ArbeidssituasjonSelvstendigSummary;
