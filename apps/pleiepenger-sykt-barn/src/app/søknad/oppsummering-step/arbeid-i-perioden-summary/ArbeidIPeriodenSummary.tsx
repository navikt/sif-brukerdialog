import React from 'react';
import { IntlShape, useIntl } from 'react-intl';
import SummaryBlock from '@navikt/sif-common-soknad-ds/lib/components/summary-block/SummaryBlock';
import SummarySection from '@navikt/sif-common-soknad-ds/lib/components/summary-section/SummarySection';
import { ISODateToDate, DateRange, prettifyDateExtended } from '@navikt/sif-common-utils';
import intlHelper from '@navikt/sif-common-core-ds/lib/utils/intlUtils';
import dayjs from 'dayjs';
import { ArbeidsgiverType } from '../../../types';
import {
    ArbeidsforholdApiData,
    ArbeidsgiverApiData,
    SøknadApiData,
} from '../../../types/søknad-api-data/SøknadApiData';
import ArbeidIPeriodeSummaryItem from './ArbeidIPeriodenSummaryItem';
import { ArbeidsforholdFrilansApiData } from '../../../types/søknad-api-data/arbeidsforholdFrilansApiData';
import ArbeidIPeriodeFrilansSummaryItem from './ArbeidIPeriodenFrilansSummaryItem';

interface Props {
    apiValues: SøknadApiData;
    søknadsperiode: DateRange;
    søknadsdato: Date;
}

export interface ArbeidIPeriodenSummaryItemType extends ArbeidsforholdApiData {
    tittel: string;
}

export interface ArbeidIPeriodenFrilansSummaryItemType extends ArbeidsforholdFrilansApiData {
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
    const arbeidsforholdIPerioden: ArbeidIPeriodenSummaryItemType[] = [];
    let arbeidsforholdIPeriodenFrilans: ArbeidIPeriodenFrilansSummaryItemType | undefined = undefined;
    arbeidsgivere.forEach((arbeidsgiverApiData) => {
        if (arbeidsgiverApiData.arbeidsforhold) {
            arbeidsforholdIPerioden.push({
                ...arbeidsgiverApiData.arbeidsforhold,
                tittel: getTittel(intl, arbeidsgiverApiData, søknadsperiode),
            });
        }
    });

    if (
        (frilans.type === 'harArbeidsforhold' || frilans.type === 'harArbeidsforholdSluttetISøknadsperiode') &&
        frilans.harInntektSomFrilanser &&
        frilans.arbeidsforhold
    ) {
        arbeidsforholdIPeriodenFrilans = {
            ...frilans.arbeidsforhold,
            tittel: 'Frilanser',
        };
    }

    if (selvstendigNæringsdrivende.harInntektSomSelvstendig && selvstendigNæringsdrivende.arbeidsforhold) {
        arbeidsforholdIPerioden.push({
            ...selvstendigNæringsdrivende.arbeidsforhold,
            tittel: intlHelper(intl, 'selvstendigNæringsdrivende.tittel'),
        });
    }

    return (
        <>
            {(arbeidsforholdIPerioden.length > 0 || arbeidsforholdIPeriodenFrilans !== undefined) && (
                <SummarySection header={intlHelper(intl, 'oppsummering.arbeidIPeriode.jobbIPerioden.header')}>
                    {arbeidsforholdIPerioden.map((arbeidsforhold) => (
                        <SummaryBlock header={arbeidsforhold.tittel} key={arbeidsforhold.tittel}>
                            <ArbeidIPeriodeSummaryItem periode={søknadsperiode} arbeidsforhold={arbeidsforhold} />
                        </SummaryBlock>
                    ))}
                    {arbeidsforholdIPeriodenFrilans !== undefined && (
                        <SummaryBlock
                            header={arbeidsforholdIPeriodenFrilans.tittel}
                            key={arbeidsforholdIPeriodenFrilans.tittel}>
                            <ArbeidIPeriodeFrilansSummaryItem
                                arbeidsforhold={arbeidsforholdIPeriodenFrilans}
                                misterHonorarerIPerioden={
                                    frilans.type === 'harArbeidsforhold' ||
                                    frilans.type === 'harArbeidsforholdSluttetISøknadsperiode'
                                        ? frilans.misterHonorarerIPerioden
                                        : undefined
                                }
                            />
                        </SummaryBlock>
                    )}
                </SummarySection>
            )}
        </>
    );
};

export default ArbeidIPeriodenSummary;
