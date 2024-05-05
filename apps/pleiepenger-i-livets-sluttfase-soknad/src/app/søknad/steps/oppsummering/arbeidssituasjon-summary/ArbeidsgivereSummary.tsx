import React from 'react';
import { ArbeidsgiverApiData } from '../../../../types/søknadApiData/SøknadApiData';
import { DateRange } from '@navikt/sif-common-formik-ds';
import { SummaryBlock } from '@navikt/sif-common-ui';
import { prettifyDateExtended } from '@navikt/sif-common-utils';
import { AppText, useAppIntl } from '../../../../i18n';

interface Props {
    arbeidsgivere?: ArbeidsgiverApiData[];
    søknadsperiode: DateRange;
}

const ArbeidsgivereSummary: React.FunctionComponent<Props> = ({ arbeidsgivere, søknadsperiode }) => {
    const { text } = useAppIntl();

    if (arbeidsgivere === undefined || arbeidsgivere.length === 0) {
        return (
            <SummaryBlock header={text('oppsummering.arbeidssituasjon.arbeidsgivere.ingenIPeriode.header')}>
                <ul>
                    <li>
                        <p>
                            <AppText id="oppsummering.arbeidssituasjon.arbeidsgivere.ingenIPeriode.tekst" />
                        </p>
                    </li>
                </ul>
            </SummaryBlock>
        );
    }

    return (
        <>
            {arbeidsgivere.map((arbeidsgiver) => {
                const { navn, organisasjonsnummer, erAnsatt } = arbeidsgiver;
                return (
                    <SummaryBlock
                        key={organisasjonsnummer}
                        header={text('arbeidsgiver.tittel', { navn, organisasjonsnummer })}>
                        <ul>
                            <li>
                                <AppText
                                    id={
                                        erAnsatt
                                            ? `oppsummering.arbeidssituasjon.arbeidsgiver.ansatt`
                                            : 'oppsummering.arbeidssituasjon.avsluttet.arbeidsgiver.ansatt'
                                    }
                                />
                            </li>
                            {arbeidsgiver.arbeidsforhold && (
                                <>
                                    <li>
                                        <AppText
                                            id={
                                                erAnsatt
                                                    ? `oppsummering.arbeidssituasjon.tid`
                                                    : `oppsummering.arbeidssituasjon.avsluttet.tid`
                                            }
                                            values={{ timer: arbeidsgiver.arbeidsforhold.jobberNormaltTimer }}
                                        />
                                    </li>
                                </>
                            )}
                            {erAnsatt === false && (
                                <li>
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
                                </li>
                            )}
                        </ul>
                    </SummaryBlock>
                );
            })}
        </>
    );
};

export default ArbeidsgivereSummary;
