import {
    DateRange,
    dateRangesCollide,
    dateRangeToISODateRange,
    dateToISODate,
    durationUtils,
    getDateRangesFromISODateRangeMap,
    getDatesInDateRange,
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
import { ArbeidsgiverIkkeFunnetError } from '../types/arbeidsgiverIkkeFunnetError';
import { K9Sak, K9SakArbeidstaker, K9SakArbeidstidInfo, K9SakArbeidstidPeriodeMap } from '../types/K9Sak';
import {
    ArbeidAktivitet,
    ArbeidAktivitetArbeidstaker,
    ArbeidAktivitetFrilanser,
    ArbeidAktivitetSelvstendigNæringsdrivende,
    ArbeidAktivitetType,
    ArbeidstidEnkeltdagMap,
    Arbeidsuke,
    ArbeidsukeMap,
    PeriodeMedArbeidstid,
    Sak,
} from '../types/Sak';
import { getDagerFraEnkeltdagMap } from './arbeidsukeUtils';
import { beregnSnittTimerPerDag } from './beregnUtils';
import { maskString } from './maskString';

interface _PeriodisertK9FormatArbeidstidPerioder {
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

/**
 * Fjerner arbeidstid fra @K9SakArbeidstidPeriodeMap som ikke er en del av tillatt endringsperiode
 * @param arbeidstidPeriodeMap
 * @param tillattEndringsperiode
 * @returns
 */
const trimArbeidstidTilTillattEndringsperiode = (
    arbeidstidPeriodeMap: K9SakArbeidstidPeriodeMap,
    tillattEndringsperiode: DateRange
): K9SakArbeidstidPeriodeMap => {
    const perioder: K9SakArbeidstidPeriodeMap = {};
    Object.keys(arbeidstidPeriodeMap).forEach((key) => {
        const { from, to } = ISODateRangeToDateRange(key);
        if (dateRangesCollide([{ from, to }, tillattEndringsperiode], true) === false) {
            return; // Er ikke innenfor gyldig tidsrom
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
): _PeriodisertK9FormatArbeidstidPerioder[] => {
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

/**
 * Konverterer array med arbeidsuker til ArbeidsukeMap
 * @param arbeidsuker
 * @returns ArbeidsukeMap
 */
const getArbeidsukerMapFromArbeidsuker = (arbeidsuker: Arbeidsuke[]): ArbeidsukeMap => {
    const arbeidsukerMap: ArbeidsukeMap = {};
    arbeidsuker.forEach((arbeidsuke) => {
        arbeidsukerMap[arbeidsuke.isoDateRange] = arbeidsuke;
    });
    return arbeidsukerMap;
};

/**
 * Mapper K9FormatArbeidstidPerioder om til enkeltdager med arbeidstid. Uavhengig av ukedager eller helg
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

const fjernArbeidstidEnkeltdagerUtenforPeriode = (
    periode: DateRange,
    arbeidstidEnkeltdager: ArbeidstidEnkeltdagMap
): ArbeidstidEnkeltdagMap => {
    const enkeltdagerMap: ArbeidstidEnkeltdagMap = {};
    getDatesInDateRange(periode)
        .map(dateToISODate)
        .sort()
        .filter((isoDate) => arbeidstidEnkeltdager[isoDate] !== undefined)
        .forEach((isoDate) => {
            enkeltdagerMap[isoDate] = arbeidstidEnkeltdager[isoDate];
        });
    return enkeltdagerMap;
};

/**
 * Mapper periode og enkeltdager med arbeid om til Arbeidsuke. Summerer tid per dag om til timer per uke
 * @param periode DateRange for uken
 * @param arbeidstidEnkeltdagerIUken Enkeltdager med arbeidstid
 * @returns Arbeidsuke
 */
const getArbeidsukeFromEnkeltdagerIUken = (
    periode: DateRange,
    arbeidstidEnkeltdager: ArbeidstidEnkeltdagMap
): Arbeidsuke => {
    const arbeidstidEnkeltdagerIUken = fjernArbeidstidEnkeltdagerUtenforPeriode(periode, arbeidstidEnkeltdager);
    const dagerSøktFor = Object.keys(arbeidstidEnkeltdagerIUken);
    const antallDagerMedArbeidstid = dagerSøktFor.length;
    const faktisk = dagerSøktFor.map((key) => arbeidstidEnkeltdagerIUken[key].faktisk);
    const normalt = dagerSøktFor.map((key) => arbeidstidEnkeltdagerIUken[key].normalt);
    const normaltSummertHeleUken = numberDurationAsDuration(durationUtils.summarizeDurations(normalt));
    const faktiskSummertHeleUken = numberDurationAsDuration(durationUtils.summarizeDurations(faktisk));

    const arbeidsuke: Arbeidsuke = {
        isoDateRange: dateRangeToISODateRange(periode),
        periode: periode,
        arbeidstidEnkeltdager: arbeidstidEnkeltdagerIUken,
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
    const dagerSøktFor = getDagerFraEnkeltdagMap(arbeidsuke.arbeidstidEnkeltdager);
    const periode: DateRange = { ...arbeidsuke.periode, from: ISODateToDate(dagerSøktFor[0]) };
    return {
        ...arbeidsuke,
        periode,
        isoDateRange: dateRangeToISODateRange(periode),
    };
};

const setArbeidsukeSluttdatoTilSisteDagSøktFor = (arbeidsuke: Arbeidsuke): Arbeidsuke => {
    const dagerSøktFor = getDagerFraEnkeltdagMap(arbeidsuke.arbeidstidEnkeltdager);
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
 * Hver uke er hele uker, inklusiv helg, med unntak av første og siste uke som
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
        const enkeltdagerIPeriode = getArbeidstidEnkeltdagMapFromPerioder(gruppertPeriode.arbeidstidPerioder);
        const arbeidsuker = getArbeidsukerMapFromArbeidsuker(getArbeidsukerFromEnkeltdager(enkeltdagerIPeriode));
        const periode: PeriodeMedArbeidstid = {
            periode: gruppertPeriode.periode,
            arbeidsuker,
        };
        return periode;
    });
};

/**
 * Sjekker om bruker har perioder med pleiepenger som er før endringsperiode
 */
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

/**
 * Sjekker om bruker har perioder med pleiepenger som er etter endringsperiode
 */
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

/**
 * Henter ut perioder med arbeidstid og info om en har perioder med pleiepenger før og etter endringsperiode
 * @param arbeidstidPerioder
 * @param endringsperiode
 * @returns
 */
const getArbeidAktivitetPerioderPart = (
    arbeidstidPerioder: K9SakArbeidstidPeriodeMap,
    endringsperiode: DateRange
): Pick<
    ArbeidAktivitet,
    'perioderMedArbeidstid' | 'harPerioderEtterTillattEndringsperiode' | 'harPerioderFørTillattEndringsperiode'
> => {
    return {
        perioderMedArbeidstid: getPerioderMedArbeidstid(arbeidstidPerioder, endringsperiode),
        harPerioderFørTillattEndringsperiode: harPerioderFørEndringsperiode(arbeidstidPerioder, endringsperiode),
        harPerioderEtterTillattEndringsperiode: harPerioderEtterEndringsperiode(arbeidstidPerioder, endringsperiode),
    };
};

/**
 *
 * @param arbeidstaker
 * @param arbeidsgivere
 * @param endringsperiode
 * @returns
 */
const getArbeidAktivitetArbeidstaker = (
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
        const error: ArbeidsgiverIkkeFunnetError = {
            type: 'ArbeidsgiverIkkeFunnet',
            message: 'getArbeidAktivitetArbeidstaker - arbeidsgiver ikke funnet',
            arbeidstaker: {
                harOrganisasjonsnummer: organisasjonsnummer !== undefined,
                maskedOrganisasjonsnummer: maskString(organisasjonsnummer),
                harNorskIdentitetsnummer: norskIdentitetsnummer !== undefined,
                maskedIdentitetsnummer: maskString(norskIdentitetsnummer),
            },
            maskedArbeidsgivere: arbeidsgivere.map((a) => maskString(a.organisasjonsnummer)),
        };
        throw error;
    }
    const endringsperiodeForArbeidsgiver = getEndringsperiodeForArbeidsgiver(endringsperiode, arbeidsgiver);
    return {
        id: `id_${arbeidsgiver.organisasjonsnummer}`,
        arbeidsgiver,
        type: ArbeidAktivitetType.arbeidstaker,
        ...getArbeidAktivitetPerioderPart(perioder, endringsperiodeForArbeidsgiver),
    };
};

/**
 *
 * @param frilanserArbeidstidInfo
 * @param endringsperiode
 * @returns
 */
const getArbeidAktivitetFrilanser = (
    frilanserArbeidstidInfo: K9SakArbeidstidInfo | undefined,
    endringsperiode: DateRange
): ArbeidAktivitetFrilanser | undefined => {
    return frilanserArbeidstidInfo !== undefined
        ? {
              id: ArbeidAktivitetType.frilanser,
              type: ArbeidAktivitetType.frilanser,
              ...getArbeidAktivitetPerioderPart(frilanserArbeidstidInfo.perioder, endringsperiode),
          }
        : undefined;
};

/**
 *
 * @param selvstendigNæringsdrivendeArbeidstidInfo
 * @param endringsperiode
 * @returns
 */
const getArbeidAktivitetSelvstendigNæringsdrivende = (
    selvstendigNæringsdrivendeArbeidstidInfo: K9SakArbeidstidInfo | undefined,
    endringsperiode: DateRange
): ArbeidAktivitetSelvstendigNæringsdrivende | undefined => {
    return selvstendigNæringsdrivendeArbeidstidInfo
        ? {
              id: ArbeidAktivitetType.selvstendigNæringsdrivende,
              type: ArbeidAktivitetType.selvstendigNæringsdrivende,
              ...getArbeidAktivitetPerioderPart(selvstendigNæringsdrivendeArbeidstidInfo.perioder, endringsperiode),
          }
        : undefined;
};

/**
 *
 * Henter ut info fra K9Sak og klargjør sak for videre behandling i dialogen
 * @param k9sak Sak hentet fra K9
 * @param arbeidsgivere Liste med arbeidsgivere
 * @param endringsperiode Periode hvor en kan endre
 * @returns Sak
 */
export const getSakFromK9Sak = (k9sak: K9Sak, arbeidsgivere: Arbeidsgiver[], endringsperiode: DateRange): Sak => {
    const { arbeidstakerList, frilanserArbeidstidInfo, selvstendigNæringsdrivendeArbeidstidInfo } =
        k9sak.ytelse.arbeidstid;
    return {
        ytelse: {
            type: 'PLEIEPENGER_SYKT_BARN',
        },
        barn: k9sak.barn,
        arbeidAktiviteter: {
            arbeidstakerArktiviteter: arbeidstakerList
                ? arbeidstakerList.map((arbeidstaker) =>
                      getArbeidAktivitetArbeidstaker(arbeidstaker, arbeidsgivere, endringsperiode)
                  )
                : [],
            frilanser: getArbeidAktivitetFrilanser(frilanserArbeidstidInfo, endringsperiode),
            selvstendigNæringsdrivende: getArbeidAktivitetSelvstendigNæringsdrivende(
                selvstendigNæringsdrivendeArbeidstidInfo,
                endringsperiode
            ),
        },
        lovbestemtFerie: {
            perioder: [...k9sak.ytelse.lovbestemtFerie.perioder],
        },
    };
};

/**
 * Eksporterer interne funksjoner for test
 */
export const _getSakFromK9Sak = {
    getArbeidAktivitetArbeidstaker,
    getArbeidAktivitetFrilanser,
    getArbeidstidPerioderIDateRange,
    getArbeidAktivitetSelvstendigNæringsdrivende,
    getArbeidsukerMapFromArbeidsuker,
    getArbeidstidEnkeltdagMapFromPerioder,
    getEndringsperiodeForArbeidsgiver,
    getArbeidsukerFromEnkeltdager,
    getArbeidsukeFromEnkeltdagerIUken,
    grupperArbeidstidPerioder,
    trimArbeidstidTilTillattEndringsperiode,
};
