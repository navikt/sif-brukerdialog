import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { ArbeidsgiverApiData } from '../../../../types/søknadApiData/SøknadApiData';
import { DateRange } from '@navikt/sif-common-formik-ds';
import { SummaryBlock } from '@navikt/sif-common-soknad-ds';
import intlHelper from '@navikt/sif-common-core-ds/src/utils/intlUtils';
import { prettifyDateExtended } from '@navikt/sif-common-utils';

interface Props {
    arbeidsgivere?: ArbeidsgiverApiData[];
    søknadsperiode: DateRange;
}

const ArbeidsgivereSummary: React.FunctionComponent<Props> = ({ arbeidsgivere, søknadsperiode }) => {
    const intl = useIntl();

    if (arbeidsgivere === undefined || arbeidsgivere.length === 0) {
        return (
            <SummaryBlock header={intlHelper(intl, 'oppsummering.arbeidssituasjon.arbeidsgivere.ingenIPeriode.header')}>
                <ul>
                    <li>
                        <FormattedMessage
                            id="oppsummering.arbeidssituasjon.arbeidsgivere.ingenIPeriode.tekst"
                            tagName="p"
                        />
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
                        header={intlHelper(intl, 'arbeidsgiver.tittel', { navn, organisasjonsnummer })}>
                        <ul>
                            <li>
                                <FormattedMessage
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
                                        <FormattedMessage
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
                                    <FormattedMessage
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
