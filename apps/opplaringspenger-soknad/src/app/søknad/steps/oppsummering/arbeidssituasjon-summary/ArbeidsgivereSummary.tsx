import { FormSummary, Heading, List } from '@navikt/ds-react';
import React from 'react';
import { DateRange } from '@navikt/sif-common-formik-ds';
import { prettifyDateExtended } from '@navikt/sif-common-utils';
import { AppText } from '../../../../i18n';
import { ArbeidsgiverApiData } from '../../../../types/søknadApiData/SøknadApiData';

interface Props {
    arbeidsgivere?: ArbeidsgiverApiData[];
    søknadsperiode: DateRange;
}

const ArbeidsgivereSummary: React.FunctionComponent<Props> = ({ arbeidsgivere, søknadsperiode }) => {
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
                            {' '}
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
                                {erAnsatt === false && (
                                    <List.Item>
                                        <AppText
                                            id={
                                                arbeidsgiver.sluttetFørSøknadsperiode
                                                    ? 'oppsummering.arbeidssituasjon.avsluttet.sluttetFørSøknadsperiode'
                                                    : 'oppsummering.arbeidssituasjon.avsluttet.sluttetISøknadsperiode'
                                            }
                                            values={{
                                                periodeFra: prettifyDateExtended(søknadsperiode.from),
                                                periodeTil: prettifyDateExtended(søknadsperiode.to),
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
