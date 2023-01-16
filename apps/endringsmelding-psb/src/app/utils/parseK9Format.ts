import {
    DateRange,
    dateRangeToISODateRange,
    dateToISODate,
    durationUtils,
    getISODatesInISODateRange,
    isDateInDateRange,
    ISODateRangeToDateRange,
    ISODateToDate,
    ISODurationToDuration,
    numberDurationAsDuration,
} from '@navikt/sif-common-utils';
import dayjs from 'dayjs';
import { K9Format, K9FormatArbeidstaker, K9FormatArbeidstidPeriode, K9FormatBarn } from '../types/k9Format';
import {
    AktivitetArbeidstid,
    ArbeidstakerMap,
    ArbeidstidEnkeltdagMap,
    Arbeidsuke,
    ArbeidsukeMap,
    Barn,
    K9Sak,
} from '../types/K9Sak';
import { beregnSnittTimerPerDag } from './beregnUtils';
import { getEndringsdato, getSøknadsperioderInnenforTillattEndringsperiode } from './endringsperiode';

const dateIsIWithinDateRanges = (date: Date, dateRanges: DateRange[]) =>
    dateRanges.some((dateRange) => isDateInDateRange(date, dateRange));

const getIsoWeekDateRangeForDate = (date: Date) => {
    const from = dayjs(date).startOf('isoWeek').toDate();
    const to = dayjs(date).endOf('isoWeek').toDate();
    return {
        from,
        to,
    };
};

/**
 *
 * @param arbeidstidPerioder K9FormatArbeidstidPeriode
 * @param søknadsperioder DateRange[] - Perioder det er søkt for
 * @returns AktivitetArbeidstid som inneholder alle dager det er søkt for,
 *          samt arbeidsuker som summerer dagene i den aktuelle uken.
 *          Faktiske timer og normaltimer smøres på uken.
 */
export const getAktivitetArbeidstidFromK9Format = (
    arbeidstidPerioder: K9FormatArbeidstidPeriode,
    søknadsperioder: DateRange[]
): AktivitetArbeidstid => {
    const arbeidsdager: ArbeidstidEnkeltdagMap = {};
    const tempArbeidsuker: ArbeidsukeMap = {};

    /**
     * Gå gjennom hver periode og legg dager til uke.
     * Legg til enkeltdag i arbeidsdager Map.
     * */
    Object.keys(arbeidstidPerioder).forEach((isoDateRange) => {
        const isoDates = getISODatesInISODateRange(isoDateRange, true);
        isoDates.forEach((isoDate) => {
            const date = ISODateToDate(isoDate);
            const dateIsInSøknadsperioder = dateIsIWithinDateRanges(date, søknadsperioder);
            if (dateIsInSøknadsperioder) {
                const faktisk = ISODurationToDuration(arbeidstidPerioder[isoDateRange].faktiskArbeidTimerPerDag);
                const normalt = ISODurationToDuration(arbeidstidPerioder[isoDateRange].jobberNormaltTimerPerDag);

                /** Midlertidig nøkkel som tar hele uken */
                const weekKey = dateRangeToISODateRange(getIsoWeekDateRangeForDate(date));
                if (tempArbeidsuker[weekKey] === undefined) {
                    const arbeidsuke: Partial<Arbeidsuke> = {};
                    tempArbeidsuker[weekKey] = arbeidsuke as Arbeidsuke;
                }
                /** Legg til enkeltdag i arbeidsuken */
                tempArbeidsuker[weekKey].dagerMap[dateToISODate(date)] = {
                    faktisk,
                    normalt,
                };
                /** Legg til enkeltdag */
                arbeidsdager[isoDate] = {
                    faktisk,
                    normalt,
                };
            }
        });
    });

    /** Summer faktisk og normalt i ukene. Kort ned periode-key dersom ikke alle dager i perioden har arbeid. */
    const arbeidsuker: ArbeidsukeMap = {};
    Object.keys(tempArbeidsuker).forEach((weekKey) => {
        const { dagerMap: days } = tempArbeidsuker[weekKey];

        const dayKeys = Object.keys(days);
        const antallArbeidsdager = dayKeys.length;
        const from = ISODateToDate(dayKeys[0]);
        const to = ISODateToDate(dayKeys[dayKeys.length - 1]);
        const periode: DateRange = { from, to };

        const faktisk = dayKeys.map((key) => days[key].faktisk);
        const normalt = dayKeys.map((key) => days[key].normalt);
        const normaltSummertHeleUken = numberDurationAsDuration(durationUtils.summarizeDurations(normalt));
        const faktiskSummertHeleUken = numberDurationAsDuration(durationUtils.summarizeDurations(faktisk));

        const arbeidsuke: Arbeidsuke = {
            periode,
            isoDateRange: dateRangeToISODateRange(periode),
            dagerMap: days,
            antallArbeidsdager,
            faktisk: {
                uke: faktiskSummertHeleUken,
                dag: beregnSnittTimerPerDag(faktiskSummertHeleUken, antallArbeidsdager),
            },
            normalt: {
                uke: normaltSummertHeleUken,
                dag: beregnSnittTimerPerDag(normaltSummertHeleUken, antallArbeidsdager),
            },
        };
        arbeidsuker[dateRangeToISODateRange({ from, to })] = arbeidsuke;
    });

    return {
        arbeidsdager,
        arbeidsuker,
    };
};

const getArbeidstidArbeidsgivere = (
    arbeidsgivere: K9FormatArbeidstaker[],
    søknadsperioder: DateRange[]
): ArbeidstakerMap => {
    const arbeidsgivereMap: ArbeidstakerMap = {};
    arbeidsgivere.forEach((a) => {
        const id = a.norskIdentitetsnummer || a.organisasjonsnummer;
        arbeidsgivereMap[id] = getAktivitetArbeidstidFromK9Format(a.arbeidstidInfo.perioder, søknadsperioder);
    });
    return arbeidsgivereMap;
};

const getBarn = (barn: K9FormatBarn): Barn => {
    return {
        aktørId: barn.aktørId,
        identitetsnummer: barn.identitetsnummer,
        fødselsdato: ISODateToDate(barn.fødselsdato),
        fornavn: barn.fornavn,
        etternavn: barn.etternavn,
        mellomnavn: barn.mellomnavn || undefined,
    };
};

export const parseK9Format = (data: K9Format): K9Sak => {
    const {
        søknad: { ytelse, søker, søknadId },
        barn,
    } = data;
    const endringsdato = getEndringsdato();
    const søknadsperioder = getSøknadsperioderInnenforTillattEndringsperiode(
        endringsdato,
        ytelse.søknadsperiode.map((periode) => ISODateRangeToDateRange(periode))
    );

    const sak: K9Sak = {
        søker: søker,
        søknadId: søknadId,
        språk: data.søknad.språk,
        mottattDato: dayjs(data.søknad.mottattDato).toDate(),
        barn: getBarn(data.barn),
        ytelse: {
            type: 'PLEIEPENGER_SYKT_BARN',
            barn: {
                norskIdentitetsnummer: barn.identitetsnummer,
                fødselsdato: barn.fødselsdato ? ISODateToDate(barn.fødselsdato) : undefined,
            },
            søknadsperioder,
            opptjeningAktivitet: {
                frilanser: ytelse.opptjeningAktivitet.frilanser
                    ? {
                          jobberFortsattSomFrilanser: ytelse.opptjeningAktivitet.frilanser.jobberFortsattSomFrilanser,
                          startdato: ISODateToDate(ytelse.opptjeningAktivitet.frilanser.startdato),
                          sluttdato: ytelse.opptjeningAktivitet.frilanser.sluttdato
                              ? ISODateToDate(ytelse.opptjeningAktivitet.frilanser.sluttdato)
                              : undefined,
                      }
                    : undefined,
            },
            arbeidstidInfo: {
                arbeidstakerMap: getArbeidstidArbeidsgivere(ytelse.arbeidstid.arbeidstakerList, søknadsperioder),
                frilanserArbeidstidInfo: ytelse.arbeidstid.frilanserArbeidstidInfo?.perioder
                    ? getAktivitetArbeidstidFromK9Format(
                          ytelse.arbeidstid.frilanserArbeidstidInfo.perioder,
                          søknadsperioder
                      )
                    : undefined,
                selvstendigNæringsdrivendeArbeidstidInfo: ytelse.arbeidstid.selvstendigNæringsdrivendeArbeidstidInfo
                    ?.perioder
                    ? getAktivitetArbeidstidFromK9Format(
                          ytelse.arbeidstid.selvstendigNæringsdrivendeArbeidstidInfo.perioder,
                          søknadsperioder
                      )
                    : undefined,
            },
        },
    };

    return sak;
};
