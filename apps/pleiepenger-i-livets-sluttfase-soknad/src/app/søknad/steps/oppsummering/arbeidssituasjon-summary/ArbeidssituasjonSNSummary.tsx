import { FormSummary } from '@navikt/ds-react';
import VirksomhetFormSummaryAnswers from '@navikt/sif-common-forms-ds/src/forms/virksomhet/VirksomhetFormSummaryAnswers';
import { AppText } from '../../../../i18n';
import { SelvstendigNæringsdrivendeApiData } from '../../../../types/søknadApiData/SøknadApiData';

interface Props {
    selvstendigNæringsdrivende?: SelvstendigNæringsdrivendeApiData;
}

function ArbeidssituasjonSNSummary({ selvstendigNæringsdrivende }: Props) {
    const { arbeidsforhold, virksomhet } = selvstendigNæringsdrivende || {};
    return (
        <FormSummary.Answer>
            <FormSummary.Label>
                <AppText id="oppsummering.arbeidssituasjon.selvstendig.header" />
            </FormSummary.Label>
            <FormSummary.Value>
                {selvstendigNæringsdrivende === undefined && (
                    <AppText id={'oppsummering.arbeidssituasjon.selvstendig.erIkkeSN'} />
                )}
                {virksomhet && arbeidsforhold && (
                    <>
                        <ul>
                            <li>
                                <AppText id="oppsummering.arbeidssituasjon.selvstendig.erSn" />
                            </li>
                            <li>
                                {virksomhet.harFlereAktiveVirksomheter ? (
                                    <AppText id="oppsummering.arbeidssituasjon.selvstendig.flereVirksomheter" />
                                ) : (
                                    <AppText id="oppsummering.arbeidssituasjon.selvstendig.enVirksomhet" />
                                )}
                            </li>
                            {arbeidsforhold.jobberNormaltTimer && (
                                <li>
                                    <AppText
                                        id={`oppsummering.arbeidssituasjon.tid`}
                                        values={{ timer: arbeidsforhold.jobberNormaltTimer }}
                                    />
                                </li>
                            )}
                            <li>
                                Registrert virksomhet:
                                <FormSummary.Answers>
                                    <VirksomhetFormSummaryAnswers virksomhet={virksomhet} />
                                </FormSummary.Answers>
                            </li>
                        </ul>
                    </>
                )}
            </FormSummary.Value>
        </FormSummary.Answer>
    );
}

export default ArbeidssituasjonSNSummary;
