import React from 'react';
import { useAppIntl } from '@i18n/index';
import intlHelper from '@navikt/sif-common-core-ds/src/utils/intlUtils';
import { SummaryBlock } from '@navikt/sif-common-ui';
import { dateFormatter, DateRange } from '@navikt/sif-common-utils';
import { AppText } from '../../../i18n';
import { ArbeidsgiverAnsattApiData } from '../../../types/søknad-api-data/SøknadApiData';
import NormalarbeidstidSummary from './NormalarbeidstidSummary';

interface Props {
    arbeidsgivere?: ArbeidsgiverAnsattApiData[];
    søknadsperiode: DateRange;
}

const ArbeidsgivereSummary: React.FunctionComponent<Props> = ({ arbeidsgivere, søknadsperiode }) => {
    const { intl } = useAppIntl();

    if (arbeidsgivere === undefined || arbeidsgivere.length === 0) {
        return (
            <SummaryBlock header={intlHelper(intl, 'oppsummering.arbeidssituasjon.arbeidsgivere.ingenIPeriode.header')}>
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
        <div data-testid="arbeidssituasjon-arbeidsgivere">
            {arbeidsgivere.map((arbeidsgiver) => {
                const { navn, organisasjonsnummer, erAnsatt } = arbeidsgiver;

                return (
                    <div data-testid={`arbeidssituasjon-ansatt-${organisasjonsnummer}`} key={organisasjonsnummer}>
                        <SummaryBlock
                            key={organisasjonsnummer}
                            header={intlHelper(intl, 'arbeidsgiver.tittel', { navn, organisasjonsnummer })}>
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
                                    <li>
                                        <NormalarbeidstidSummary
                                            erAnsatt={erAnsatt}
                                            normalarbeidstidApiData={arbeidsgiver.arbeidsforhold.normalarbeidstid}
                                        />
                                    </li>
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
                                                periodeFra: dateFormatter.full(søknadsperiode.from),
                                                periodeTil: dateFormatter.full(søknadsperiode.to),
                                            }}
                                        />
                                    </li>
                                )}
                            </ul>
                        </SummaryBlock>
                    </div>
                );
            })}
        </div>
    );
};

export default ArbeidsgivereSummary;
