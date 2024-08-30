import { SelvstendigNæringsdrivendeApiData } from '../../../../types/søknadApiData/SøknadApiData';
import { FormSummary, Heading, List } from '@navikt/ds-react';
import { AppText, useAppIntl } from '../../../../i18n';
import VirksomhetFormSummary from '@navikt/sif-common-forms-ds/src/forms/virksomhet/VirksomhetFormSummary';

interface Props {
    selvstendigNæringsdrivende?: SelvstendigNæringsdrivendeApiData;
}

function ArbeidssituasjonSNSummary({ selvstendigNæringsdrivende }: Props) {
    const { text } = useAppIntl();
    const { arbeidsforhold, virksomhet } = selvstendigNæringsdrivende || {};
    return (
        <FormSummary.Answer>
            <FormSummary.Label>
                <Heading level="3" size="small">
                    <AppText id="oppsummering.arbeidssituasjon.selvstendig.header" />
                </Heading>
            </FormSummary.Label>
            <FormSummary.Value>
                <List>
                    {selvstendigNæringsdrivende === undefined && (
                        <List.Item>
                            <AppText id={'oppsummering.arbeidssituasjon.selvstendig.erIkkeSN'} />
                        </List.Item>
                    )}
                    {virksomhet && arbeidsforhold && (
                        <>
                            <List.Item>
                                <AppText id="oppsummering.arbeidssituasjon.selvstendig.erSn" />
                            </List.Item>
                            <List.Item>
                                {virksomhet.harFlereAktiveVirksomheter ? (
                                    <AppText id="oppsummering.arbeidssituasjon.selvstendig.flereVirksomheter" />
                                ) : (
                                    <AppText id="oppsummering.arbeidssituasjon.selvstendig.enVirksomhet" />
                                )}
                            </List.Item>
                            {arbeidsforhold.jobberNormaltTimer && (
                                <List.Item>
                                    <AppText
                                        id={`oppsummering.arbeidssituasjon.tid`}
                                        values={{ timer: arbeidsforhold.jobberNormaltTimer }}
                                    />
                                </List.Item>
                            )}
                            <List.Item title={text('summary.virksomhet.virksomhetInfo.tittel')}>
                                <VirksomhetFormSummary virksomhet={virksomhet} />
                            </List.Item>
                        </>
                    )}
                </List>
            </FormSummary.Value>
        </FormSummary.Answer>
    );
}

export default ArbeidssituasjonSNSummary;
