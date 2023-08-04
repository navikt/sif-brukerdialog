import React from 'react';
import { IntlShape, useIntl } from 'react-intl';
import intlHelper from '@navikt/sif-common-core-ds/lib/utils/intlUtils';
import SummaryBlock from '@navikt/sif-common-soknad-ds/lib/components/summary-block/SummaryBlock';
import SummarySection from '@navikt/sif-common-soknad-ds/lib/components/summary-section/SummarySection';
import { DateRange, ISODateToDate, prettifyDateExtended } from '@navikt/sif-common-utils';
import dayjs from 'dayjs';
import { ArbeidsgiverType } from '../../../types';
import { ArbeidIPeriodeType } from '../../../types/ArbeidIPeriodeType';
import {
    ArbeidsforholdApiData,
    ArbeidsgiverApiData,
    FrilansApiType,
    SøknadApiData,
} from '../../../types/søknad-api-data/SøknadApiData';
import ArbeidIPeriodeSummaryItem, { ArbeidIPeriodenSummaryItemType } from './ArbeidIPeriodenSummaryItem';

interface Props {
    apiValues: SøknadApiData;
    søknadsperiode: DateRange;
    søknadsdato: Date;
}

export interface ArbeidIPeriodenFrilansSummaryItemType extends ArbeidsforholdApiData {
    tittel: string;
}

const getTittel = (intl: IntlShape, arbeidsgiver: ArbeidsgiverApiData, periode: DateRange) => {
    switch (arbeidsgiver.type) {
        case ArbeidsgiverType.ORGANISASJON:
            return intlHelper(intl, 'arbeidsgiver.tittel', {
                navn: arbeidsgiver.navn,
                organisasjonsnummer: arbeidsgiver.organisasjonsnummer,
            });
        case ArbeidsgiverType.PRIVATPERSON:
            return arbeidsgiver.navn;
        case ArbeidsgiverType.FRILANSOPPDRAG:
            const startdato = arbeidsgiver.ansattFom && ISODateToDate(arbeidsgiver.ansattFom);
            const sluttdato = arbeidsgiver.ansattTom && ISODateToDate(arbeidsgiver.ansattTom);

            if (startdato || sluttdato) {
                const intlValues = {
                    hvor: arbeidsgiver.navn,
                    startdato: startdato ? prettifyDateExtended(startdato) : undefined,
                    sluttdato: sluttdato ? prettifyDateExtended(sluttdato) : undefined,
                };
                const visStartdato = startdato;
                const visSluttdato = sluttdato && dayjs(sluttdato).isBefore(periode.to, 'day');

                if (visStartdato && visSluttdato) {
                    return intlHelper(intl, 'frilans.tittel.startOgSlutt', intlValues);
                }
                if (visStartdato) {
                    return intlHelper(intl, 'frilans.tittel.start', intlValues);
                }
                if (visSluttdato) {
                    return intlHelper(intl, 'frilans.tittel.slutt', intlValues);
                }
            }
            return intlHelper(intl, 'frilans.tittel');
    }
};

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
                tittel: getTittel(intl, arbeidsgiverApiData, søknadsperiode),
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
                    {summaryItem.map((arbeidsforhold) => (
                        <SummaryBlock header={arbeidsforhold.tittel} key={arbeidsforhold.tittel}>
                            <ArbeidIPeriodeSummaryItem periode={søknadsperiode} arbeidsforhold={arbeidsforhold} />
                        </SummaryBlock>
                    ))}
                </SummarySection>
            )}
        </>
    );
};

export default ArbeidIPeriodenSummary;
