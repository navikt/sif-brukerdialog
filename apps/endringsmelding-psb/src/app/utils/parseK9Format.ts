import {
    DateRange,
    dateRangeToISODateRange,
    dateToISODate,
    durationUtils,
    getISODatesInISODateRange,
    getIsoWeekDateRangeForDate,
    isDateInDateRanges,
    ISODateRange,
    ISODateRangeToDateRange,
    ISODateToDate,
    ISODurationToDuration,
    numberDurationAsDuration,
} from '@navikt/sif-common-utils';
import dayjs from 'dayjs';
import {
    K9Format,
    K9FormatArbeidstaker,
    K9FormatArbeidstid,
    K9FormatArbeidstidPeriode,
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
import { beregnSnittTimerPerDag } from './beregnUtils';
import { getEndringsdato, getSøknadsperioderInnenforTillattEndringsperiode } from './endringsperiode';

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
const getUkePeriodeForDager = (
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
    const enkeltdagerMedArbeid: ArbeidstidEnkeltdagMap = {};
    const ukerMedArbeidsdagerMap: { [uke: ISODateRange]: { dagerMap: ArbeidstidEnkeltdagMap } } = {};

    /**
     * Gå gjennom hver periode og legg dager til uke.
     * Legg til enkeltdag i arbeidsdager Map.
     * */
    Object.keys(arbeidstidPerioder).forEach((isoDateRange) => {
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
                        dagerMap: {},
                    };
                }
                /** Legg til enkeltdag i arbeidsuken */
                ukerMedArbeidsdagerMap[weekKey].dagerMap[dateToISODate(date)] = {
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
        const { dagerMap } = ukerMedArbeidsdagerMap[weekKey];

        const dayKeys = Object.keys(dagerMap);
        const antallDagerMedArbeidstid = dayKeys.length;
        const faktisk = dayKeys.map((key) => dagerMap[key].faktisk);
        const normalt = dayKeys.map((key) => dagerMap[key].normalt);
        const normaltSummertHeleUken = numberDurationAsDuration(durationUtils.summarizeDurations(normalt));
        const faktiskSummertHeleUken = numberDurationAsDuration(durationUtils.summarizeDurations(faktisk));
        const periode: DateRange = getUkePeriodeForDager(dagerMap, enkeltdagerMedArbeid);

        const arbeidsuke: Arbeidsuke = {
            isoDateRange: dateRangeToISODateRange(periode),
            periode,
            faktisk: {
                uke: faktiskSummertHeleUken,
                dag: beregnSnittTimerPerDag(faktiskSummertHeleUken, antallDagerMedArbeidstid),
            },
            normalt: {
                uke: normaltSummertHeleUken,
                dag: beregnSnittTimerPerDag(normaltSummertHeleUken, antallDagerMedArbeidstid),
            },
            meta: {
                antallDagerMedArbeidstid: antallDagerMedArbeidstid,
                ukenummer: dayjs(periode.from).isoWeek(),
                årstall: dayjs(periode.from).isoWeekYear(),
            },
        };
        arbeidsuker[dateRangeToISODateRange(periode)] = arbeidsuke;
    });
    return {
        arbeidsdager: enkeltdagerMedArbeid,
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
