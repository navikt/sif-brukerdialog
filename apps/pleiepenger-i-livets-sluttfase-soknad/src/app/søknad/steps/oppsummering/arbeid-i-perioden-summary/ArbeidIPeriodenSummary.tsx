import React from 'react';
import { IntlShape, useIntl } from 'react-intl';
import dayjs from 'dayjs';
import ArbeidIPeriodeSummaryItem from './ArbeidIPeriodenSummaryItem';
import {
    ArbeidsforholdApiData,
    ArbeidsgiverApiData,
    SøknadApiData,
} from '../../../../types/søknadApiData/SøknadApiData';
import { DateRange } from '@navikt/sif-common-formik-ds/lib';
import { ArbeidsgiverType } from '../../../../types/Arbeidsgiver';
import intlHelper from '@navikt/sif-common-core-ds/src/utils/intlUtils';
import { ISODateToDate, prettifyDateExtended } from '@navikt/sif-common-utils/lib';
import { SummaryBlock, SummarySection } from '@navikt/sif-common-soknad-ds';

interface Props {
    apiValues: SøknadApiData;
    dagerMedPleie: Date[];
    søknadsperiode: DateRange;
}

export interface ArbeidIPeriodenSummaryItemType extends ArbeidsforholdApiData {
    tittel: string;
    erAktivIPeriode: boolean;
}

const getArbeidsgiverTittel = (intl: IntlShape, arbeidsgiver: ArbeidsgiverApiData, periode: DateRange) => {
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
                const visStartdato = startdato; // TODO - skal denne inn igjen? && dayjs(startdato).isAfter(periode.from, 'day');
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
    dagerMedPleie,
    søknadsperiode,
}) => {
    const intl = useIntl();
    const alleArbeidsforhold: ArbeidIPeriodenSummaryItemType[] = [];

    if (arbeidsgivere) {
        arbeidsgivere.forEach((arbeidsgiverApiData) => {
            if (arbeidsgiverApiData.arbeidsforhold) {
                alleArbeidsforhold.push({
                    ...arbeidsgiverApiData.arbeidsforhold,
                    tittel: getArbeidsgiverTittel(intl, arbeidsgiverApiData, søknadsperiode),
                    erAktivIPeriode: arbeidsgiverApiData.arbeidsforhold.arbeidIPeriode !== undefined,
                });
            }
        });
    }

    if (frilans?.arbeidsforhold) {
        alleArbeidsforhold.push({
            ...frilans.arbeidsforhold,
            tittel: 'Frilanser',
            erAktivIPeriode: frilans.arbeidsforhold.arbeidIPeriode !== undefined,
        });
    }

    if (selvstendigNæringsdrivende?.arbeidsforhold) {
        alleArbeidsforhold.push({
            ...selvstendigNæringsdrivende.arbeidsforhold,
            tittel: intlHelper(intl, 'selvstendigNæringsdrivende.tittel'),
            erAktivIPeriode: true,
        });
    }

    const aktiveArbeidsforhold = alleArbeidsforhold.filter((a) => a.erAktivIPeriode);

    if (aktiveArbeidsforhold.length === 0) {
        return null;
    }

    return (
        <>
            {aktiveArbeidsforhold.length > 0 && (
                <SummarySection header={intlHelper(intl, 'oppsummering.arbeidIPeriode.jobbIPerioden.header')}>
                    {aktiveArbeidsforhold.map((forhold, index) =>
                        forhold.arbeidIPeriode ? (
                            <SummaryBlock header={forhold.tittel} key={forhold.tittel}>
                                <ArbeidIPeriodeSummaryItem
                                    periode={søknadsperiode}
                                    dagerMedPleie={dagerMedPleie}
                                    arbeidIPeriode={forhold.arbeidIPeriode}
                                    normaltimerUke={forhold.jobberNormaltTimer}
                                />
                            </SummaryBlock>
                        ) : (
                            <div key={index}>Informasjon om arbeid i perioden mangler</div>
                        ),
                    )}
                </SummarySection>
            )}
        </>
    );
};

export default ArbeidIPeriodenSummary;
