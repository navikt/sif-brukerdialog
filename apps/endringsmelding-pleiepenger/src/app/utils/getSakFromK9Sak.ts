import {
    DateRange,
    dateRangesCollide,
    dateRangeToISODateRange,
    durationUtils,
    getDateRangesFromISODateRangeMap,
    getISODatesInISODateRange,
    getIsoWeekDateRangeForDate,
    isDateInDateRange,
    ISODateRangeToDateRange,
    ISODateToDate,
    joinAdjacentDateRanges,
    numberDurationAsDuration,
} from '@navikt/sif-common-utils/lib';
import dayjs from 'dayjs';
import { Arbeidsgiver } from '../types/Arbeidsgiver';
import { K9Sak, K9SakArbeidstaker, K9SakArbeidstid, K9SakArbeidstidPeriodeMap } from '../types/K9Sak';
import {
    ArbeidAktivitetArbeidstaker,
    ArbeidAktiviteter,
    ArbeidAktivitetType,
    ArbeidstidEnkeltdagMap,
    Arbeidsuke,
    ArbeidsukeMap,
    PeriodeMedArbeidstid,
    Sak,
} from '../types/Sak';
import { beregnSnittTimerPerDag } from './beregnUtils';

interface PeriodisertK9FormatArbeidstidPerioder {
    periode: DateRange;
    arbeidstidPerioder: K9SakArbeidstidPeriodeMap;
}

/**
 * Korter ned periode til sluttdato for arbeidsforholdet, dersom denne er satt
 * @param tillattEndringsperiode
 * @param arbeidsgiver
 * @returns DateRange
 */
const getEndringsperiodeForArbeidsgiver = (
    tillattEndringsperiode: DateRange,
    arbeidsgiver: Arbeidsgiver
): DateRange => {
    return {
        ...tillattEndringsperiode,
        to: arbeidsgiver.ansattTom || tillattEndringsperiode.to,
    };
};

const trimArbeidstidTilTillattEndringsperiode = (
    arbeidstidPeriodeMap: K9SakArbeidstidPeriodeMap,
    tillattEndringsperiode: DateRange
): K9SakArbeidstidPeriodeMap => {
    const perioder: K9SakArbeidstidPeriodeMap = {};
    Object.keys(arbeidstidPeriodeMap).forEach((key) => {
        const { from, to } = ISODateRangeToDateRange(key);
        // Er ikke innenfor gyldig tidsrom
        if (dateRangesCollide([{ from, to }, tillattEndringsperiode], true) === false) {
            return;
        }
        const førsteDato = tillattEndringsperiode.from;
        const sisteDato = tillattEndringsperiode.to;
        const dateRangeToUse: DateRange = {
            from: dayjs(from).isBefore(førsteDato, 'day') ? førsteDato : from,
            to: dayjs(to).isAfter(sisteDato, 'day') ? sisteDato : to,
        };
        perioder[dateRangeToISODateRange(dateRangeToUse)] = arbeidstidPeriodeMap[key];
    });
    return perioder;
};

/**
 * Finner alle arbeidstidPerioder innenfor et tidsrom
 * @param dateRange
 * @param arbeidstidPerioder K9FormatArbeidstidPerioder
 * @returns K9FormatArbeidstidPerioder
 */
const getArbeidstidPerioderIDateRange = (
    dateRange: DateRange,
    arbeidstidPerioder: K9SakArbeidstidPeriodeMap
): K9SakArbeidstidPeriodeMap => {
    const arbeidstidPeriodeIPeriode: K9SakArbeidstidPeriodeMap = {};
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
const grupperArbeidstidPerioder = (
    arbeidstidPeriodeMap: K9SakArbeidstidPeriodeMap
): PeriodisertK9FormatArbeidstidPerioder[] => {
    const dateRanges = getDateRangesFromISODateRangeMap(arbeidstidPeriodeMap);
    const grupperteDateRanges = joinAdjacentDateRanges(dateRanges, true);
    return grupperteDateRanges.map((periode) => {
        const arbeidstidPerioderIPeriode = getArbeidstidPerioderIDateRange(periode, arbeidstidPeriodeMap);
        return {
            periode,
            arbeidstidPerioder: arbeidstidPerioderIPeriode,
        };
    });
};

const getArbeidsukerMapFromArbeidsuker = (arbeidsuker: Arbeidsuke[]) => {
    const arbeidsukerMap: ArbeidsukeMap = {};
    arbeidsuker.forEach((arbeidsuke) => {
        arbeidsukerMap[arbeidsuke.isoDateRange] = arbeidsuke;
    });
    return arbeidsukerMap;
};

/**
 * Mapper K9FormatArbeidstidPerioder om til enkeltdager med arbeidstid
 * @param arbeidstidPeriodeMap
 * @returns
 */
const getArbeidstidEnkeltdagMapFromPerioder = (
    arbeidstidPeriodeMap: K9SakArbeidstidPeriodeMap
): ArbeidstidEnkeltdagMap => {
    const enkeltdager: ArbeidstidEnkeltdagMap = {};
    Object.keys(arbeidstidPeriodeMap).forEach((isoDateRange) => {
        const arbeidstidPeriode = arbeidstidPeriodeMap[isoDateRange];
        getISODatesInISODateRange(isoDateRange, true).forEach((isoDate) => {
            enkeltdager[isoDate] = {
                faktisk: arbeidstidPeriode.faktiskArbeidTimerPerDag,
                normalt: arbeidstidPeriode.jobberNormaltTimerPerDag,
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
const getArbeidsukeFromEnkeltdagerIUken = (
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

/**
 * Mapper K9format-arbeidstid til perioder med arbeidstid
 * @param arbeidstidPeriodeMap
 * @returns PeriodeMedArbeidstid[]
 */
const getPerioderMedArbeidstid = (
    arbeidstidPeriodeMap: K9SakArbeidstidPeriodeMap,
    tillattEndringsperiode: DateRange
): PeriodeMedArbeidstid[] => {
    const perioder = trimArbeidstidTilTillattEndringsperiode(arbeidstidPeriodeMap, tillattEndringsperiode);

    return grupperArbeidstidPerioder(perioder).map((gruppertPeriode) => {
        const enkeltdager = getArbeidstidEnkeltdagMapFromPerioder(gruppertPeriode.arbeidstidPerioder);
        const arbeidsuker = getArbeidsukerMapFromArbeidsuker(getArbeidsukerFromEnkeltdager(enkeltdager));
        const periode: PeriodeMedArbeidstid = {
            periode: gruppertPeriode.periode,
            enkeltdager,
            arbeidsuker,
        };
        return periode;
    });
};

const harPerioderFørEndringsperiode = (
    arbeidstidPeriodeMap: K9SakArbeidstidPeriodeMap,
    tillattEndringsperiode: DateRange
): boolean => {
    return Object.keys(arbeidstidPeriodeMap)
        .map(ISODateRangeToDateRange)
        .some(
            ({ to, from }) =>
                dayjs(to).isBefore(tillattEndringsperiode.from, 'day') ||
                dayjs(from).isBefore(tillattEndringsperiode.from, 'day')
        );
};

const harPerioderEtterEndringsperiode = (
    arbeidstidPeriodeMap: K9SakArbeidstidPeriodeMap,
    tillattEndringsperiode: DateRange
): boolean => {
    return Object.keys(arbeidstidPeriodeMap)
        .map(ISODateRangeToDateRange)
        .some(
            ({ to, from }) =>
                dayjs(to).isAfter(tillattEndringsperiode.to, 'day') ||
                dayjs(from).isAfter(tillattEndringsperiode.to, 'day')
        );
};

const getArbeidstakerArktivitet = (
    arbeidstaker: K9SakArbeidstaker,
    arbeidsgivere: Arbeidsgiver[],
    endringsperiode: DateRange
): ArbeidAktivitetArbeidstaker => {
    const {
        arbeidstidInfo: { perioder },
        organisasjonsnummer,
        norskIdentitetsnummer,
    } = arbeidstaker;
    const id = norskIdentitetsnummer || organisasjonsnummer;
    const arbeidsgiver = arbeidsgivere.find((a) => a.organisasjonsnummer === id);
    if (!arbeidsgiver) {
        throw 'getArbeidstakerArktiviteter - arbeidsgiver ikke funnet';
    }
    const endringsperiodeForArbeidsgiver = getEndringsperiodeForArbeidsgiver(endringsperiode, arbeidsgiver);
    return {
        id: `id_${arbeidsgiver.organisasjonsnummer}`,
        arbeidsgiver,
        type: ArbeidAktivitetType.arbeidstaker,
        perioderMedArbeidstid: getPerioderMedArbeidstid(perioder, endringsperiodeForArbeidsgiver),
        harPerioderFørEndringsperiode: harPerioderFørEndringsperiode(perioder, endringsperiodeForArbeidsgiver),
        harPerioderEtterEndringsperiode: harPerioderEtterEndringsperiode(perioder, endringsperiodeForArbeidsgiver),
    };
};

const getArbeidAktiviteterFromK9Sak2 = (
    arbeidstid: K9SakArbeidstid,
    arbeidsgivere: Arbeidsgiver[],
    endringsperiode: DateRange
): ArbeidAktiviteter => {
    const { arbeidstakerList, frilanserArbeidstidInfo, selvstendigNæringsdrivendeArbeidstidInfo } = arbeidstid;
    return {
        arbeidstakerArktiviteter: arbeidstakerList
            ? arbeidstakerList.map((arbeidstaker) =>
                  getArbeidstakerArktivitet(arbeidstaker, arbeidsgivere, endringsperiode)
              )
            : [],
        frilanser:
            frilanserArbeidstidInfo !== undefined
                ? {
                      id: ArbeidAktivitetType.frilanser,
                      type: ArbeidAktivitetType.frilanser,
                      perioderMedArbeidstid: getPerioderMedArbeidstid(
                          frilanserArbeidstidInfo.perioder,
                          endringsperiode
                      ),
                      harPerioderFørEndringsperiode: harPerioderFørEndringsperiode(
                          frilanserArbeidstidInfo.perioder,
                          endringsperiode
                      ),
                      harPerioderEtterEndringsperiode: harPerioderFørEndringsperiode(
                          frilanserArbeidstidInfo.perioder,
                          endringsperiode
                      ),
                  }
                : undefined,
        selvstendigNæringsdrivende:
            selvstendigNæringsdrivendeArbeidstidInfo !== undefined
                ? {
                      id: ArbeidAktivitetType.selvstendigNæringsdrivende,
                      type: ArbeidAktivitetType.selvstendigNæringsdrivende,
                      perioderMedArbeidstid: getPerioderMedArbeidstid(
                          selvstendigNæringsdrivendeArbeidstidInfo.perioder,
                          endringsperiode
                      ),
                      harPerioderFørEndringsperiode: harPerioderFørEndringsperiode(
                          selvstendigNæringsdrivendeArbeidstidInfo.perioder,
                          endringsperiode
                      ),
                      harPerioderEtterEndringsperiode: harPerioderFørEndringsperiode(
                          selvstendigNæringsdrivendeArbeidstidInfo.perioder,
                          endringsperiode
                      ),
                  }
                : undefined,
    };
};

export const getDagerSøktFor = (arbeidstidEnkeltdager: ArbeidstidEnkeltdagMap) => {
    return Object.keys(arbeidstidEnkeltdager).sort();
};

export const getSakFromK9Sak = (k9sak: K9Sak, arbeidsgivere: Arbeidsgiver[], endringsperiode: DateRange): Sak => {
    return {
        ytelse: {
            type: 'PLEIEPENGER_SYKT_BARN',
        },
        barn: k9sak.barn,
        arbeidAktiviteter: getArbeidAktiviteterFromK9Sak2(k9sak.ytelse.arbeidstid, arbeidsgivere, endringsperiode),
    };
};
