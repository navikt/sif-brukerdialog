import {
    DateRange,
    dateRangeToISODateRange,
    dateToISODate,
    Duration,
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

const getTid = (tid: Duration | undefined): Duration => {
    return {
        hours: tid?.hours || '0',
        minutes: tid?.minutes || '0',
    };
};

export const getAktivitetArbeidstidFromK9Format = (
    arbeidstidPerioder: K9FormatArbeidstidPeriode,
    søknadsperioder: DateRange[]
): AktivitetArbeidstid => {
    const arbeidsdager: ArbeidstidEnkeltdagMap = {};
    const tempArbeidsuker: ArbeidsukeMap = {};

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
                    const arbeidsuke: Partial<Arbeidsuke> = {
                        dagerMap: {},
                    };
                    tempArbeidsuker[weekKey] = arbeidsuke as Arbeidsuke;
                }
                tempArbeidsuker[weekKey].dagerMap[dateToISODate(date)] = {
                    faktisk,
                    normalt,
                };
                arbeidsdager[isoDate] = {
                    faktisk: getTid(faktisk),
                    normalt: getTid(normalt),
                };
            }
        });
    });

    /** Summer of korriger key til å kun omfavne faktiske dager med arbeid i uken */
    const arbeidsuker: ArbeidsukeMap = {};
    Object.keys(tempArbeidsuker).forEach((weekKey) => {
        const { dagerMap: days } = tempArbeidsuker[weekKey];

        const dayKeys = Object.keys(days);
        const from = ISODateToDate(dayKeys[0]);
        const to = ISODateToDate(dayKeys[dayKeys.length - 1]);
        const periode: DateRange = { from, to };

        const faktisk = dayKeys.map((key) => days[key].faktisk);
        const normalt = dayKeys.map((key) => days[key].normalt);

        const arbeidsuke: Arbeidsuke = {
            periode,
            isoDateRange: dateRangeToISODateRange(periode),
            dagerMap: days,
            faktisk: numberDurationAsDuration(durationUtils.summarizeDurations(faktisk)),
            normalt: numberDurationAsDuration(durationUtils.summarizeDurations(normalt)),
        };
        arbeidsuker[dateRangeToISODateRange({ from, to })] = arbeidsuke;
    });
    return {
        // samletPeriode,
        // allePerioder,
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

// export const getOppgjeningsaktivitetArbeidstaker = (
//     k9Arbeidstaker: K9FormatArbeidstaker[]
// ): K9OpptjeningAktivitetArbeidstaker[] => {
//     return k9Arbeidstaker.map(({ arbeidstidInfo, organisasjonsnummer }) => {
//         return {
//             perioder: getOpptjeningAktivitetPerioderFromArbeidstidInfo(arbeidstidInfo),
//             info: {
//                 organisasjonsnummer,
//             },
//         };
//     });
// };

// export const getOpptjeningsaktivitetFrilanser = (
//     info?: K9FormatOpptjeningAktivitetFrilanser
// ): K9OpptjeningAktivitetFrilanser => {
//     return {
//         perioder: getOpptjeningAktivitetPerioderFromArbeidstidInfo(arbeidstidInfo),
//         info: info
//             ? {
//                   startdato: ISODateToDate(info.startdato),
//                   jobberFortsattSomFrilanser: info.jobberFortsattSomFrilanser,
//                   sluttdato:
//                       info.jobberFortsattSomFrilanser === false && info.sluttdato
//                           ? ISODateToDate(info.sluttdato)
//                           : undefined,
//               }
//             : undefined,
//     };
// };

// export const getOppgjeningsaktivitetSelvstendig = (
//     arbeidstidInfo: K9FormatArbeidstidInfo,
//     info?: K9FormatOpptjeningAktivitetSelvstendig
// ): K9OpptjeningAktivitetSelvstendig => {
//     return {
//         perioder: getOpptjeningAktivitetPerioderFromArbeidstidInfo(arbeidstidInfo),
//         info: info
//             ? {
//                   organisasjonsnummer: info.organisasjonsnummer,
//                   startdato: ISODateToDate(info.startdato),
//                   sluttdato: info.sluttdato ? ISODateToDate(info.sluttdato) : undefined,
//               }
//             : undefined,
//     };
// };

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
