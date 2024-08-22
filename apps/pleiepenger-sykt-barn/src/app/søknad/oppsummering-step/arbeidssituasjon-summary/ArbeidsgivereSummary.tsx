import { FormSummary, Heading, List } from '@navikt/ds-react';
import React from 'react';
import { dateFormatter, DateRange } from '@navikt/sif-common-utils';
import { AppText } from '../../../i18n';
import { ArbeidsgiverAnsattApiData } from '../../../types/søknad-api-data/SøknadApiData';
import NormalarbeidstidSummary from './NormalarbeidstidSummary';

interface Props {
    arbeidsgivere?: ArbeidsgiverAnsattApiData[];
    søknadsperiode: DateRange;
}

const ArbeidsgivereSummary: React.FunctionComponent<Props> = ({ arbeidsgivere, søknadsperiode }) => {
    if (arbeidsgivere === undefined || arbeidsgivere.length === 0) {
        return (
            <FormSummary.Answer>
                <FormSummary.Label>
                    <Heading level="3" size="small">
                        <AppText id="oppsummering.arbeidssituasjon.arbeidsgivere.ingenIPeriode.header" />
                    </Heading>
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
                                    <List.Item>
                                        <NormalarbeidstidSummary
                                            erAnsatt={erAnsatt}
                                            normalarbeidstidApiData={arbeidsgiver.arbeidsforhold.normalarbeidstid}
                                        />
                                    </List.Item>
                                )}
                                {erAnsatt === false && (
                                    <List.Item>
                                        <AppText
                                            id={
                                                arbeidsgiver.sluttetFørSøknadsperiode
                                                    ? 'oppsummering.arbeidssituasjon.avsluttet.sluttetFørSøknadsperiode'
                                                    : 'oppsummering.arbeidssituasjon.avsluttet.sluttetISøknadsperiode'
                                            }
                                            values={{
                                                periodeFra: dateFormatter.full(søknadsperiode.from),
                                                periodeTil: dateFormatter.full(søknadsperiode.to),
                                            }}
                                        />
                                    </List.Item>
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
