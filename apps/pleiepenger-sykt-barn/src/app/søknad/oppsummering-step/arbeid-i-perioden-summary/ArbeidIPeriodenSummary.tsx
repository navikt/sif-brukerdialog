import React from 'react';
import { useIntl } from 'react-intl';
import intlHelper from '@navikt/sif-common-core-ds/src/utils/intlUtils';
import SummaryBlock from '@navikt/sif-common-soknad-ds/lib/components/summary-block/SummaryBlock';
import SummarySection from '@navikt/sif-common-soknad-ds/lib/components/summary-section/SummarySection';
import { DateRange } from '@navikt/sif-common-utils';
import { ArbeidsforholdApiData, SøknadApiData } from '../../../types/søknad-api-data/SøknadApiData';
import ArbeidIPeriodeSummaryItem, { ArbeidIPeriodenSummaryItemType } from './ArbeidIPeriodenSummaryItem';

interface Props {
    apiValues: SøknadApiData;
    søknadsperiode: DateRange;
    søknadsdato: Date;
}

export interface ArbeidIPeriodenFrilansSummaryItemType extends ArbeidsforholdApiData {
    tittel: string;
}

const ArbeidIPeriodenSummary: React.FunctionComponent<Props> = ({
    apiValues: { arbeidsgivere, frilans, selvstendigNæringsdrivende },
    søknadsperiode,
}) => {
    const intl = useIntl();
    const summaryItem: ArbeidIPeriodenSummaryItemType[] = [];

    arbeidsgivere.forEach((arbeidsgiverApiData) => {
        if (arbeidsgiverApiData.arbeidsforhold) {
            summaryItem.push({
                ...arbeidsgiverApiData.arbeidsforhold,
                tittel: intlHelper(intl, 'arbeidsgiver.tittel', {
                    navn: arbeidsgiverApiData.navn,
                    organisasjonsnummer: arbeidsgiverApiData.organisasjonsnummer,
                }),
            });
        }
    });

    if (frilans.harInntektSomFrilanser && frilans._misterInntektSomFrilanser) {
        summaryItem.push({
            ...frilans.arbeidsforhold,
            tittel: intlHelper(intl, 'frilans.tittel'),
        });
    }

    if (selvstendigNæringsdrivende.harInntektSomSelvstendig && selvstendigNæringsdrivende.arbeidsforhold) {
        summaryItem.push({
            ...selvstendigNæringsdrivende.arbeidsforhold,
            tittel: intlHelper(intl, 'selvstendigNæringsdrivende.tittel'),
        });
    }

    return (
        <>
            {summaryItem.length > 0 && (
                <SummarySection header={intlHelper(intl, 'oppsummering.arbeidIPeriode.jobbIPerioden.header')}>
                    {summaryItem.map((item) => (
                        <SummaryBlock header={item.tittel} key={item.tittel}>
                            <ArbeidIPeriodeSummaryItem periode={søknadsperiode} arbeidIPeriodeSummaryItem={item} />
                        </SummaryBlock>
                    ))}
                </SummarySection>
            )}
        </>
    );
};

export default ArbeidIPeriodenSummary;
