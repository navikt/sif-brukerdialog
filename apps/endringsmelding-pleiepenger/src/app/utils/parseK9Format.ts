import {
    DateRange,
    dateRangeToISODateRange,
    dateToISODate,
    durationUtils,
    getDateRangesFromISODateRangeMap,
    getISODatesInISODateRange,
    getIsoWeekDateRangeForDate,
    isDateInDateRange,
    isDateInDateRanges,
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
    K9FormatArbeidstidPerioder,
    K9FormatBarn,
} from '../types/k9Format';
import {
    AktivitetArbeidstid,
    ArbeidstakerMap,
    ArbeidstidEnkeltdagMap,
    Arbeidsuke,
    ArbeidsukeMap,
    ArbeidsukeMetaData,
    Barn,
    K9Sak,
    PeriodeMedArbeidsuker,
    YtelseArbeidstid,
} from '../types/K9Sak';
import { beregnSnittTimerPerDag } from './beregnUtils';
import { getEndringsdato, getSøknadsperioderInnenforTillattEndringsperiode } from './endringsperiode';
import { isISODateRange } from './typeGuardUtilities';

export const getDagerSøktFor = (arbeidstidEnkeltdager: ArbeidstidEnkeltdagMap) => {
    return Object.keys(arbeidstidEnkeltdager).sort();
};

/** -------------------------------- */

/**
 * Mapper perioder om til enkeltdager med arbeidstid
 * @param arbeidstidPerioder
 * @returns
 */
const getArbeidstidEnkeltdagMapFromPerioder = (
    arbeidstidPerioder: K9FormatArbeidstidPerioder
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
        meta: getArbeidsukeMeta(periode, dagerSøktFor.length),
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

interface PeriodeMedArbeid {
    periode: DateRange;
    enkeltdager: ArbeidstidEnkeltdagMap;
    arbeidsuker: Arbeidsuke[];
}
const getAktivitetArbeidstidFromK9FormatV2 = (arbeidstidPerioder: K9FormatArbeidstidPerioder) => {
    const perioderMedArbeid: PeriodeMedArbeid[] = [];
    grupperArbeidstidPerioder(arbeidstidPerioder).forEach((gruppertPeriode) => {
        const enkeltdager = getArbeidstidEnkeltdagMapFromPerioder(gruppertPeriode.arbeidstidPerioder);
        const arbeidsuker = getArbeidsukerFromEnkeltdager(enkeltdager);
        perioderMedArbeid.push({
            periode: gruppertPeriode.periode,
            enkeltdager,
            arbeidsuker,
        });
    });
    return perioderMedArbeid;
};

/** -------------------------------- */

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

interface PeriodisertK9FormatArbeidstidPerioder {
    periode: DateRange;
    arbeidstidPerioder: K9FormatArbeidstidPerioder;
}

export const getArbeidstidPerioderIPeriode = (
    periode: DateRange,
    arbeidstidPerioder: K9FormatArbeidstidPerioder
): K9FormatArbeidstidPerioder => {
    const arbeidstidPeriodeIPeriode: K9FormatArbeidstidPerioder = {};
    Object.keys(arbeidstidPerioder)
        .filter((key) => isDateInDateRange(ISODateRangeToDateRange(key).from, periode))
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
    arbeidstidPerioder: K9FormatArbeidstidPerioder
): PeriodisertK9FormatArbeidstidPerioder[] => {
    const dateRanges = getDateRangesFromISODateRangeMap(arbeidstidPerioder);
    const grupperteDateRanges = joinAdjacentDateRanges(dateRanges, true); //.map(includeWeekendIfDateRangeEndsOnFridayOrLater));
    return grupperteDateRanges.map((periode) => {
        const arbeidstidPerioderIPeriode = getArbeidstidPerioderIPeriode(periode, arbeidstidPerioder);
        return {
            periode,
            arbeidstidPerioder: arbeidstidPerioderIPeriode,
        };
    });
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
    arbeidstidPerioder: K9FormatArbeidstidPerioder,
    søknadsperioder: DateRange[]
): AktivitetArbeidstid => {
    const enkeltdagerMedArbeid: ArbeidstidEnkeltdagMap = {};
    const ukerMedArbeidsdagerMap: { [uke: ISODateRange]: { arbeidstidEnkeltdager: ArbeidstidEnkeltdagMap } } = {};

    getAktivitetArbeidstidFromK9FormatV2(arbeidstidPerioder);

    // const gruppertArbeidstidPerioder = grupperArbeidstidPerioder(arbeidstidPerioder);

    // console.log(gruppertArbeidstidPerioder);

    // console.log(perioderMedArbeidstid);

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
            const dateIsInSøknadsperioder = isDateInDateRanges(date, søknadsperioder);
            if (dateIsInSøknadsperioder) {
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
            }
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
            meta: getArbeidsukeMeta(periode, dagerSøktFor.length),
        };
        arbeidsuker[dateRangeToISODateRange(periode)] = arbeidsuke;
    });

    const perioder: PeriodeMedArbeidsuker[] = grupperArbeidsuker(arbeidsuker);
    return {
        perioder,
        enkeltdagerMedArbeid,
        arbeidsuker,
    };
};

export const getArbeidsukeMeta = (
    arbeidsukePeriode: DateRange,
    antallDagerMedArbeidstid: number
): ArbeidsukeMetaData => {
    return {
        antallDagerMedArbeidstid,
        // ukenummer: dayjs(arbeidsukePeriode.from).isoWeek(),
        // årstall: dayjs(arbeidsukePeriode.from).isoWeekYear(),
    };
};

export const grupperArbeidsuker = (arbeidsuker: ArbeidsukeMap): PeriodeMedArbeidsuker[] => {
    // const antallArbeidsuker = Object.keys(arbeidsuker).length;
    // let periodeDateRange: Partial<DateRange> = {};
    // let arbeidsukerIPeriode: Arbeidsuke[] = [];

    // const arbeidsukerArr = Object.keys(arbeidsuker).map((key) => arbeidsuker[key]);

    // const perioder: PeriodeMedArbeidsuker[] = [];

    // Object.keys(arbeidsuker)
    //     .map((key) => arbeidsuker[key])
    //     .forEach((arbeidsuke, index) => {
    //         arbeidsukerIPeriode.push(arbeidsuke);

    //         if (!periodeDateRange) {
    //             periodeDateRange = {
    //                 from: arbeidsuke.periode.from,
    //             };
    //         }
    //         if (index === antallArbeidsuker - 1 || ) {
    //             periodeDateRange.to = arbeidsuke.periode.to;
    //         } else {

    //         }
    //         const nestePeriode =
    //         // perioder.push({
    //         //     periode: periodeDateRange,
    //         //     arbeidsuker: [...arbeidsukerIPeriode]
    //         // });

    //         // console.log({ periodeDateRange, arbeidsuke });
    //     });
    return [];
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
        ...barn,
        fødselsdato: ISODateToDate(barn.fødselsdato),
        mellomnavn: barn.mellomnavn || undefined,
    };
};

const getArbeidstidInfo = (
    { arbeidstakerList, frilanserArbeidstidInfo, selvstendigNæringsdrivendeArbeidstidInfo }: K9FormatArbeidstid,
    søknadsperioder: DateRange[]
): YtelseArbeidstid => {
    return {
        arbeidstakerMap: getArbeidstidArbeidsgivere(arbeidstakerList, søknadsperioder),
        frilanserArbeidstidInfo: frilanserArbeidstidInfo?.perioder
            ? getAktivitetArbeidstidFromK9Format(frilanserArbeidstidInfo.perioder, søknadsperioder)
            : undefined,
        selvstendigNæringsdrivendeArbeidstidInfo: selvstendigNæringsdrivendeArbeidstidInfo?.perioder
            ? getAktivitetArbeidstidFromK9Format(selvstendigNæringsdrivendeArbeidstidInfo.perioder, søknadsperioder)
            : undefined,
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
            arbeidstidInfo: getArbeidstidInfo(ytelse.arbeidstid, søknadsperioder),
        },
    };

    return sak;
};

export const parseK9FormatUtils = {
    getArbeidsukeDateRangeUtFraEnkeltdager,
    getAktivitetArbeidstidFromK9Format,
    getArbeidstidArbeidsgivere,
    getBarn,
    getArbeidstidInfo,
    getArbeidsukeMeta,
};
