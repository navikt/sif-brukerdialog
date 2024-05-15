import React from 'react';
import { useAppIntl } from '@i18n/index';
import { SummaryBlock, SummarySection } from '@navikt/sif-common-ui';
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
    const { text } = useAppIntl();
    const summaryItem: ArbeidIPeriodenSummaryItemType[] = [];

    arbeidsgivere.forEach((arbeidsgiverApiData) => {
        if (arbeidsgiverApiData.arbeidsforhold) {
            summaryItem.push({
                ...arbeidsgiverApiData.arbeidsforhold,
                tittel: text('arbeidsgiver.tittel', {
                    navn: arbeidsgiverApiData.navn,
                    organisasjonsnummer: arbeidsgiverApiData.organisasjonsnummer,
                }),
            });
        }
    });

    if (frilans.harInntektSomFrilanser && frilans._misterInntektSomFrilanser) {
        summaryItem.push({
            ...frilans.arbeidsforhold,
            tittel: text('frilans.tittel'),
        });
    }

    if (selvstendigNæringsdrivende.harInntektSomSelvstendig && selvstendigNæringsdrivende.arbeidsforhold) {
        summaryItem.push({
            ...selvstendigNæringsdrivende.arbeidsforhold,
            tittel: text('selvstendigNæringsdrivende.tittel'),
        });
    }

    return (
        <>
            {summaryItem.length > 0 && (
                <SummarySection header={text('oppsummering.arbeidIPeriode.jobbIPerioden.header')}>
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
