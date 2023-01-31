import {
    DateRange,
    dateRangeToISODateRange,
    dateToISODate,
    durationUtils,
    getDateRangesFromISODateRangeMap,
    getISODatesInISODateRange,
    getIsoWeekDateRangeForDate,
    isDateInDateRange,
    ISODateRange,
    ISODateRangeToDateRange,
    ISODateToDate,
    ISODurationToDuration,
    joinAdjacentDateRanges,
    numberDurationAsDuration,
} from '@navikt/sif-common-utils';
import dayjs from 'dayjs';
import {
    K9Format,
    K9FormatArbeidstaker,
    K9FormatArbeidstid,
    K9FormatArbeidstidInfoPerioder,
    K9FormatBarn,
} from '../types/k9Format';
import {
    AktivitetArbeidstid,
    ArbeidstakerMap,
    ArbeidstidEnkeltdagMap,
    Arbeidsuke,
    ArbeidsukeMap,
    Barn,
    K9Sak,
    YtelseArbeidstid,
} from '../types/K9Sak';
import { PeriodeMedArbeidstid } from '../types/PeriodeMedArbeidstid';
import { beregnSnittTimerPerDag } from './beregnUtils';
import { getEndringsdato, getSøknadsperioderInnenforTillattEndringsperiode } from './endringsperiode';
import { isISODateRange } from './typeGuardUtilities';

export const getDagerSøktFor = (arbeidstidEnkeltdager: ArbeidstidEnkeltdagMap) => {
    return Object.keys(arbeidstidEnkeltdager).sort();
};

/** Internt interface */
interface PeriodisertK9FormatArbeidstidPerioder {
    periode: DateRange;
    arbeidstidPerioder: K9FormatArbeidstidInfoPerioder;
}

/**
 * Mapper K9FormatArbeidstidPerioder om til enkeltdager med arbeidstid
 * @param arbeidstidPerioder
 * @returns
 */
const getArbeidstidEnkeltdagMapFromPerioder = (
    arbeidstidPerioder: K9FormatArbeidstidInfoPerioder
): ArbeidstidEnkeltdagMap => {
    const enkeltdager: ArbeidstidEnkeltdagMap = {};

    Object.keys(arbeidstidPerioder).forEach((isoDateRange) => {
        const arbeidstidPeriode = arbeidstidPerioder[isoDateRange];
        getISODatesInISODateRange(isoDateRange, true).forEach((isoDate) => {
            enkeltdager[isoDate] = {
                faktisk: ISODurationToDuration(arbeidstidPeriode.faktiskArbeidTimerPerDag),
                normalt: ISODurationToDuration(arbeidstidPeriode.jobberNormaltTimerPerDag),
            };
        });
    });
    return enkeltdager;
};

/**
 * Mapper periode og enkeltdager med arbeid om til Arbeidsuke. Summerer tid per dag om til timer per uke
 * @param periode DateRange for uken
 * @param arbeidstidEnkeltdager Enkeltdager med arbeidstid
 * @returns Arbeidsuke
 */
export const getArbeidsukeFromEnkeltdagerIUken = (
    periode: DateRange,
    arbeidstidEnkeltdager: ArbeidstidEnkeltdagMap
): Arbeidsuke => {
    const dagerSøktFor = Object.keys(arbeidstidEnkeltdager);
    const antallDagerMedArbeidstid = dagerSøktFor.length;
    const faktisk = dagerSøktFor.map((key) => arbeidstidEnkeltdager[key].faktisk);
    const normalt = dagerSøktFor.map((key) => arbeidstidEnkeltdager[key].normalt);
    const normaltSummertHeleUken = numberDurationAsDuration(durationUtils.summarizeDurations(normalt));
    const faktiskSummertHeleUken = numberDurationAsDuration(durationUtils.summarizeDurations(faktisk));

    const arbeidsuke: Arbeidsuke = {
        isoDateRange: dateRangeToISODateRange(periode),
        periode,
        arbeidstidEnkeltdager,
        faktisk: {
            uke: faktiskSummertHeleUken,
            dag: beregnSnittTimerPerDag(faktiskSummertHeleUken, antallDagerMedArbeidstid),
        },
        normalt: {
            uke: normaltSummertHeleUken,
            dag: beregnSnittTimerPerDag(normaltSummertHeleUken, antallDagerMedArbeidstid),
        },
        antallDagerMedArbeidstid: dagerSøktFor.length,
    };
    return arbeidsuke;
};

/**
 * Grupperer arbeidsdager inn i uker
 * Hver uke er hele uker, med unntak av første og siste uke som
 * justeres i henhold til første og siste arbeidsdag.
 *
 * @param enkeltdager
 * @returns Array av arbeidsuker
 */
const getArbeidsukerFromEnkeltdager = (enkeltdager: ArbeidstidEnkeltdagMap): Arbeidsuke[] => {
    const ukerMap: {
        [key: string]: {
            dagerMap: ArbeidstidEnkeltdagMap;
        };
    } = {};

    /** Legg dager til uker */
    Object.keys(enkeltdager).forEach((isoDate) => {
        const date = ISODateToDate(isoDate);
        const { faktisk, normalt } = enkeltdager[isoDate];

        /** Midlertidig nøkkel som tar hele uken */
        const isoDateRange = dateRangeToISODateRange(getIsoWeekDateRangeForDate(date));
        if (ukerMap[isoDateRange] === undefined) {
            ukerMap[isoDateRange] = {
                dagerMap: {},
            };
        }
        /** Legg til enkeltdag i arbeidsuken */
        ukerMap[isoDateRange].dagerMap[isoDate] = {
            faktisk,
            normalt,
        };
    });

    const arbeidsuker = Object.keys(ukerMap).map((isoDateRange) => {
        const uke = ISODateRangeToDateRange(isoDateRange);
        const dager = ukerMap[isoDateRange].dagerMap;
        return getArbeidsukeFromEnkeltdagerIUken(uke, dager);
    });

    /** Juster start og sluttdato til første og siste dag søkt for (dag med arbeidstid) */
    arbeidsuker[0] = setArbeidsukeStartdatoTilFørsteDagSøktFor(arbeidsuker[0]);
    arbeidsuker[arbeidsuker.length - 1] = setArbeidsukeSluttdatoTilSisteDagSøktFor(arbeidsuker[arbeidsuker.length - 1]);

    return arbeidsuker;
};

const setArbeidsukeStartdatoTilFørsteDagSøktFor = (arbeidsuke: Arbeidsuke): Arbeidsuke => {
    const dagerSøktFor = getDagerSøktFor(arbeidsuke.arbeidstidEnkeltdager);
    const periode: DateRange = { ...arbeidsuke.periode, from: ISODateToDate(dagerSøktFor[0]) };
    return {
        ...arbeidsuke,
        periode,
        isoDateRange: dateRangeToISODateRange(periode),
    };
};

const setArbeidsukeSluttdatoTilSisteDagSøktFor = (arbeidsuke: Arbeidsuke): Arbeidsuke => {
    const dagerSøktFor = getDagerSøktFor(arbeidsuke.arbeidstidEnkeltdager);
    const periode: DateRange = {
        ...arbeidsuke.periode,
        to: ISODateToDate(dagerSøktFor[dagerSøktFor.length - 1]),
    };
    return {
        ...arbeidsuke,
        periode,
        isoDateRange: dateRangeToISODateRange(periode),
    };
};

/**
 * Mapper K9format-arbeidstid til perioder med arbeidstid
 * @param arbeidstidPerioder K9FormatArbeidstidPerioder
 * @returns PeriodeMedArbeidstid[]
 */
const getPerioderMedArbeidstid = (arbeidstidPerioder: K9FormatArbeidstidInfoPerioder): PeriodeMedArbeidstid[] => {
    return grupperArbeidstidPerioder(arbeidstidPerioder).map((gruppertPeriode) => {
        const enkeltdager = getArbeidstidEnkeltdagMapFromPerioder(gruppertPeriode.arbeidstidPerioder);
        const arbeidsuker = getArbeidsukerFromEnkeltdager(enkeltdager);
        const periode: PeriodeMedArbeidstid = {
            periode: gruppertPeriode.periode,
            enkeltdager,
            arbeidsuker,
        };
        return periode;
    });
};

/**
 * Finner alle arbeidstidPerioder innenfor et tidsrom
 * @param dateRange
 * @param arbeidstidPerioder K9FormatArbeidstidPerioder
 * @returns K9FormatArbeidstidPerioder
 */
export const getArbeidstidPerioderIDateRange = (
    dateRange: DateRange,
    arbeidstidPerioder: K9FormatArbeidstidInfoPerioder
): K9FormatArbeidstidInfoPerioder => {
    const arbeidstidPeriodeIPeriode: K9FormatArbeidstidInfoPerioder = {};
    Object.keys(arbeidstidPerioder)
        .filter((key) => isDateInDateRange(ISODateRangeToDateRange(key).from, dateRange))
        .forEach((key) => {
            arbeidstidPeriodeIPeriode[key] = arbeidstidPerioder[key];
        });
    return arbeidstidPeriodeIPeriode;
};

/**
 * Slår sammen arbeidstidperioder som henger sammen, også dem som kun har en helg mellom.
 * @param arbeidstidPerioder
 * @returns PeriodisertK9FormatArbeidstidPerioder
 */
export const grupperArbeidstidPerioder = (
    arbeidstidPerioder: K9FormatArbeidstidInfoPerioder
): PeriodisertK9FormatArbeidstidPerioder[] => {
    const dateRanges = getDateRangesFromISODateRangeMap(arbeidstidPerioder);
    const grupperteDateRanges = joinAdjacentDateRanges(dateRanges, true);
    return grupperteDateRanges.map((periode) => {
        const arbeidstidPerioderIPeriode = getArbeidstidPerioderIDateRange(periode, arbeidstidPerioder);
        return {
            periode,
            arbeidstidPerioder: arbeidstidPerioderIPeriode,
        };
    });
};

/**
 * Henter ut arbeidstid for alle arbeidsgivere registrert på sak
 * @param arbeidsgivere
 * @returns
 */
const getArbeidstidArbeidsgivere = (arbeidsgivere: K9FormatArbeidstaker[]): ArbeidstakerMap => {
    const arbeidsgivereMap: ArbeidstakerMap = {};
    arbeidsgivere.forEach((a) => {
        const id = a.norskIdentitetsnummer || a.organisasjonsnummer;
        arbeidsgivereMap[id] = {
            aktivitetArbeidstid: getAktivitetArbeidstidFromK9Format(a.arbeidstidInfo.perioder),
            perioderMedArbeidstid: getPerioderMedArbeidstid(a.arbeidstidInfo.perioder),
        };
    });
    return arbeidsgivereMap;
};

/**
 * Henter ut informasjon om barn fra k9sak
 * @param barn K9FormatBarn
 * @returns Barn
 */
const getBarn = (barn: K9FormatBarn): Barn => {
    return {
        ...barn,
        fødselsdato: ISODateToDate(barn.fødselsdato),
        mellomnavn: barn.mellomnavn || undefined,
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
    arbeidstidPerioder: K9FormatArbeidstidInfoPerioder
): AktivitetArbeidstid => {
    const enkeltdagerMedArbeid: ArbeidstidEnkeltdagMap = {};
    const ukerMedArbeidsdagerMap: { [uke: ISODateRange]: { arbeidstidEnkeltdager: ArbeidstidEnkeltdagMap } } = {};

    /**
     * Gå gjennom hver periode og legg dager til uke.
     * Legg til enkeltdag i arbeidsdager Map.
     * */
    Object.keys(arbeidstidPerioder).forEach((isoDateRange) => {
        if (!isISODateRange(isoDateRange)) {
            throw 'Periode er ikke isoDateRange';
        }
        const isoDates = getISODatesInISODateRange(isoDateRange, true);

        isoDates.forEach((isoDate) => {
            const date = ISODateToDate(isoDate);
            const faktisk = ISODurationToDuration(arbeidstidPerioder[isoDateRange].faktiskArbeidTimerPerDag);
            const normalt = ISODurationToDuration(arbeidstidPerioder[isoDateRange].jobberNormaltTimerPerDag);

            /** Midlertidig nøkkel som tar hele uken */
            const weekKey = dateRangeToISODateRange(getIsoWeekDateRangeForDate(date));
            if (ukerMedArbeidsdagerMap[weekKey] === undefined) {
                ukerMedArbeidsdagerMap[weekKey] = {
                    arbeidstidEnkeltdager: {},
                };
            }
            /** Legg til enkeltdag i arbeidsuken */
            ukerMedArbeidsdagerMap[weekKey].arbeidstidEnkeltdager[dateToISODate(date)] = {
                faktisk,
                normalt,
            };
            /** Legg til enkeltdag */
            enkeltdagerMedArbeid[isoDate] = {
                faktisk,
                normalt,
            };
        });
    });

    /** Summer faktisk og normalt i ukene. Kort ned periode-key dersom ikke alle dager i perioden har arbeid. */
    const arbeidsuker: ArbeidsukeMap = {};
    Object.keys(ukerMedArbeidsdagerMap).forEach((weekKey) => {
        const { arbeidstidEnkeltdager } = ukerMedArbeidsdagerMap[weekKey];

        const dagerSøktFor = Object.keys(arbeidstidEnkeltdager);
        const antallDagerMedArbeidstid = dagerSøktFor.length;
        const faktisk = dagerSøktFor.map((key) => arbeidstidEnkeltdager[key].faktisk);
        const normalt = dagerSøktFor.map((key) => arbeidstidEnkeltdager[key].normalt);
        const normaltSummertHeleUken = numberDurationAsDuration(durationUtils.summarizeDurations(normalt));
        const faktiskSummertHeleUken = numberDurationAsDuration(durationUtils.summarizeDurations(faktisk));
        const periode: DateRange = getArbeidsukeDateRangeUtFraEnkeltdager(arbeidstidEnkeltdager, enkeltdagerMedArbeid);

        const arbeidsuke: Arbeidsuke = {
            isoDateRange: dateRangeToISODateRange(periode),
            periode,
            arbeidstidEnkeltdager,
            faktisk: {
                uke: faktiskSummertHeleUken,
                dag: beregnSnittTimerPerDag(faktiskSummertHeleUken, antallDagerMedArbeidstid),
            },
            normalt: {
                uke: normaltSummertHeleUken,
                dag: beregnSnittTimerPerDag(normaltSummertHeleUken, antallDagerMedArbeidstid),
            },
            antallDagerMedArbeidstid,
        };
        arbeidsuker[dateRangeToISODateRange(periode)] = arbeidsuke;
    });

    return {
        enkeltdagerMedArbeid,
        arbeidsuker,
    };
};
/**
 *
 * @param arbeidstid: K9FormatArbeidstid
 * @returns YtelseArbeidstid
 */
const getArbeidstidInfo = ({
    arbeidstakerList,
    frilanserArbeidstidInfo,
    selvstendigNæringsdrivendeArbeidstidInfo,
}: K9FormatArbeidstid): YtelseArbeidstid => {
    return {
        arbeidstakerMap: getArbeidstidArbeidsgivere(arbeidstakerList),
        frilanserArbeidstidInfo: frilanserArbeidstidInfo?.perioder
            ? {
                  aktivitetArbeidstid: getAktivitetArbeidstidFromK9Format(frilanserArbeidstidInfo.perioder),
                  perioderMedArbeidstid: getPerioderMedArbeidstid(frilanserArbeidstidInfo.perioder),
              }
            : undefined,
        selvstendigNæringsdrivendeArbeidstidInfo: selvstendigNæringsdrivendeArbeidstidInfo?.perioder
            ? {
                  aktivitetArbeidstid: getAktivitetArbeidstidFromK9Format(
                      selvstendigNæringsdrivendeArbeidstidInfo.perioder
                  ),
                  perioderMedArbeidstid: getPerioderMedArbeidstid(selvstendigNæringsdrivendeArbeidstidInfo.perioder),
              }
            : undefined,
    };
};

/**
 * Parser en hel sak fra K9
 * @param data data mottat fra backend
 * @returns K9Sak
 */
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
            arbeidstidInfo: getArbeidstidInfo(ytelse.arbeidstid),
        },
    };

    return sak;
};

/**
 *
 * Finner DateRange for uke. Dersom siste dag med arbeidstid er
 * fredag og påfølgende mandag har info om arbeidstid, returneres DateRange for hele uken. Dersom siste dag
 * er mandag-torsdag returneres perioden til og med denne dagen.
 *
 * @param dagerMap Dager med arbeid i uke
 * @param alleArbeidsdager Alle arbeidsdager på sak
 * @returns DateRange for uke
 */
const getArbeidsukeDateRangeUtFraEnkeltdager = (
    dagerMap: ArbeidstidEnkeltdagMap,
    alleArbeidsdager: ArbeidstidEnkeltdagMap
): DateRange => {
    const dayKeys = Object.keys(dagerMap);
    const førsteDag = ISODateToDate(dayKeys[0]);
    const sisteDag = dayjs(ISODateToDate(dayKeys[dayKeys.length - 1]));

    if (sisteDag.isoWeekday() === 5) {
        const påfølgendeMandag = sisteDag.add(3, 'days').toDate();
        /** Returner tidsperiode for hele uken dersom perioden fortsetter uken etter */
        if (alleArbeidsdager[dateToISODate(påfølgendeMandag)] !== undefined) {
            return {
                from: førsteDag,
                to: sisteDag.add(2, 'days').toDate(),
            };
        }
        return {
            from: førsteDag,
            to: sisteDag.toDate(),
        };
    }
    return {
        from: førsteDag,
        to: sisteDag.toDate(),
    };
};
export const parseK9FormatUtils = {
    getArbeidstidArbeidsgivere,
    getBarn,
    getArbeidstidInfo,
};
