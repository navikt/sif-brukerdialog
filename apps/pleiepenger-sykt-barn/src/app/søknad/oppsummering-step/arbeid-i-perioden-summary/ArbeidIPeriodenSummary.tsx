import React from 'react';
import { useIntl } from 'react-intl';
import intlHelper from '@navikt/sif-common-core-ds/lib/utils/intlUtils';
import SummaryBlock from '@navikt/sif-common-soknad-ds/lib/components/summary-block/SummaryBlock';
import SummarySection from '@navikt/sif-common-soknad-ds/lib/components/summary-section/SummarySection';
import { DateRange } from '@navikt/sif-common-utils';
import { ArbeidIPeriodeType } from '../../../types/ArbeidIPeriodeType';
import { ArbeidsforholdApiData, FrilansApiType, SøknadApiData } from '../../../types/søknad-api-data/SøknadApiData';
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

    if (
        frilans.type === FrilansApiType.KUN_FRILANSARBEID ||
        frilans.type === FrilansApiType.FRILANSARBEID_OG_HONORARARBEID
    ) {
        summaryItem.push({
            ...frilans.frilansarbeid.arbeidsforhold,
            tittel: 'Frilanser',
        });
    }
    if (
        frilans.type === FrilansApiType.KUN_HONORARARBEID_MISTER_HONORAR ||
        frilans.type === FrilansApiType.FRILANSARBEID_OG_HONORARARBEID
    ) {
        if (frilans.honorararbeid.misterHonorar) {
            summaryItem.push({
                ...frilans.honorararbeid.arbeidsforhold,
                tittel: 'Honorar for styreverv/andre små verv',
                gjelderHonorararbeid: true,
            });
        } else
            summaryItem.push({
                normalarbeidstid: {
                    timerPerUkeISnitt: 'PT0H',
                },
                arbeidIPeriode: {
                    type: ArbeidIPeriodeType.arbeiderVanlig,
                },
                tittel: 'Honorar for styreverv/andre små verv',
                gjelderHonorararbeid: true,
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
