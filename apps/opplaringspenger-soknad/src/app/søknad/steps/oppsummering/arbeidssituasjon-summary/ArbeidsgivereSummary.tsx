import { FormSummary, Heading, List } from '@navikt/ds-react';
import { DateRange } from '@navikt/sif-common-formik-ds';
import { AppText } from '../../../../i18n';
import { ArbeidsgiverApiData } from '../../../../types/søknadApiData/SøknadApiData';

interface Props {
    arbeidsgivere?: ArbeidsgiverApiData[];
    søknadsperiode: DateRange;
}

const ArbeidsgivereSummary = ({ arbeidsgivere }: Props) => {
    if (arbeidsgivere === undefined || arbeidsgivere.length === 0) {
        return (
            <FormSummary.Answer>
                <FormSummary.Label>
                    <AppText id="oppsummering.arbeidssituasjon.arbeidsgivere.ingenIPeriode.header" />
                </FormSummary.Label>
                <FormSummary.Value>
                    <List>
                        <List.Item>
                            <AppText id="oppsummering.arbeidssituasjon.arbeidsgivere.ingenIPeriode.tekst" />
                        </List.Item>
                    </List>
                </FormSummary.Value>
            </FormSummary.Answer>
        );
    }

    return (
        <>
            {arbeidsgivere.map((arbeidsgiver) => {
                const { navn, organisasjonsnummer, erAnsatt } = arbeidsgiver;
                return (
                    <FormSummary.Answer key={organisasjonsnummer}>
                        <FormSummary.Label>
                            <Heading level="3" size="small">
                                <AppText id="arbeidsgiver.tittel" values={{ navn, organisasjonsnummer }} />
                            </Heading>
                        </FormSummary.Label>
                        <FormSummary.Value>
                            <List>
                                <List.Item>
                                    <AppText
                                        id={
                                            erAnsatt
                                                ? `oppsummering.arbeidssituasjon.arbeidsgiver.ansatt`
                                                : 'oppsummering.arbeidssituasjon.avsluttet.arbeidsgiver.ansatt'
                                        }
                                    />
                                </List.Item>
                                {arbeidsgiver.arbeidsforhold && (
                                    <>
                                        <List.Item>
                                            <AppText
                                                id={
                                                    erAnsatt
                                                        ? `oppsummering.arbeidssituasjon.tid`
                                                        : `oppsummering.arbeidssituasjon.avsluttet.tid`
                                                }
                                                values={{ timer: arbeidsgiver.arbeidsforhold.jobberNormaltTimer }}
                                            />
                                        </List.Item>
                                    </>
                                )}
                            </List>
                        </FormSummary.Value>
                    </FormSummary.Answer>
                );
            })}
        </>
    );
};

export default ArbeidsgivereSummary;
