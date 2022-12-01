import {
    DateRange,
    dateRangeUtils,
    Duration,
    getISODatesInISODateRange,
    isDateInDateRange,
    ISODateRangeToDateRange,
    ISODateToDate,
    ISODurationToDuration,
} from '@navikt/sif-common-utils';
import dayjs from 'dayjs';
import {
    K9Format,
    K9FormatArbeidstaker,
    K9FormatArbeidstidInfo,
    K9FormatArbeidstidPeriode,
    K9FormatBarn,
    K9FormatOpptjeningAktivitetFrilanser,
    K9FormatOpptjeningAktivitetSelvstendig,
    K9FormatTilsynsordningPerioder,
} from '../types/k9Format';
import {
    ArbeidstakerMap,
    ArbeidstidEnkeltdagSak,
    Barn,
    K9OpptjeningAktivitetArbeidstaker,
    K9OpptjeningAktivitetFrilanser,
    K9OpptjeningAktivitetSelvstendig,
    K9Sak,
    TidEnkeltdag,
} from '../types/K9Sak';
import { getEndringsdato, getSøknadsperioderInnenforTillattEndringsperiode } from './endringsperiode';

export const getTilsynsdagerFromK9Format = (data: K9FormatTilsynsordningPerioder): TidEnkeltdag => {
    const enkeltdager: TidEnkeltdag = {};

    Object.keys(data).forEach((isoDateRange) => {
        const duration = data[isoDateRange].etablertTilsynTimerPerDag;
        const time = ISODurationToDuration(duration);
        if (time) {
            const isoDates = getISODatesInISODateRange(isoDateRange, true);
            isoDates.forEach((isoDate) => {
                enkeltdager[isoDate] = { hours: time.hours, minutes: time.minutes };
            });
        }
    });
    return enkeltdager;
};

const dateIsIWithinDateRanges = (date: Date, dateRanges: DateRange[]) =>
    dateRanges.some((dateRange) => isDateInDateRange(date, dateRange));

export const getAktivitetArbeidstidFromK9Format = (
    arbeidstidPerioder: K9FormatArbeidstidPeriode,
    søknadsperioder: DateRange[]
): ArbeidstidEnkeltdagSak => {
    const arbeidstid: ArbeidstidEnkeltdagSak = {
        faktisk: {},
        normalt: {},
    };

    const getTid = (tid: Duration | undefined): Duration => {
        return {
            hours: tid?.hours || '0',
            minutes: tid?.minutes || '0',
        };
    };
    Object.keys(arbeidstidPerioder).forEach((isoDateRange) => {
        const isoDates = getISODatesInISODateRange(isoDateRange, true);
        isoDates.forEach((isoDate) => {
            const date = ISODateToDate(isoDate);
            const dateIsInSøknadsperioder = dateIsIWithinDateRanges(date, søknadsperioder);
            if (dateIsInSøknadsperioder) {
                arbeidstid.faktisk[isoDate] = getTid(
                    ISODurationToDuration(arbeidstidPerioder[isoDateRange].faktiskArbeidTimerPerDag)
                );
                arbeidstid.normalt[isoDate] = getTid(
                    ISODurationToDuration(arbeidstidPerioder[isoDateRange].jobberNormaltTimerPerDag)
                );
            }
        });
    });

    return arbeidstid;
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

export const getOpptjeningAktivitetPerioderFromArbeidstidInfo = (arbeidstidInfo: K9FormatArbeidstidInfo) => {
    const allePerioder = dateRangeUtils.getDateRangesFromISODateRangeMap(arbeidstidInfo.perioder);
    const samletPeriode = dateRangeUtils.getDateRangeFromDateRanges(allePerioder);
    return {
        allePerioder,
        samletPeriode,
    };
};

export const getOppgjeningsaktivitetArbeidstaker = (
    k9Arbeidstaker: K9FormatArbeidstaker[]
): K9OpptjeningAktivitetArbeidstaker[] => {
    return k9Arbeidstaker.map(({ arbeidstidInfo, organisasjonsnummer }) => {
        return {
            perioder: getOpptjeningAktivitetPerioderFromArbeidstidInfo(arbeidstidInfo),
            info: {
                organisasjonsnummer,
            },
        };
    });
};

export const getOpptjeningsaktivitetFrilanser = (
    arbeidstidInfo: K9FormatArbeidstidInfo,
    info?: K9FormatOpptjeningAktivitetFrilanser
): K9OpptjeningAktivitetFrilanser => {
    return {
        perioder: getOpptjeningAktivitetPerioderFromArbeidstidInfo(arbeidstidInfo),
        info: info
            ? {
                  startdato: ISODateToDate(info.startdato),
                  jobberFortsattSomFrilanser: info.jobberFortsattSomFrilanser,
                  sluttdato:
                      info.jobberFortsattSomFrilanser === false && info.sluttdato
                          ? ISODateToDate(info.sluttdato)
                          : undefined,
              }
            : undefined,
    };
};

export const getOppgjeningsaktivitetSelvstendig = (
    arbeidstidInfo: K9FormatArbeidstidInfo,
    info?: K9FormatOpptjeningAktivitetSelvstendig
): K9OpptjeningAktivitetSelvstendig => {
    return {
        perioder: getOpptjeningAktivitetPerioderFromArbeidstidInfo(arbeidstidInfo),
        info: info
            ? {
                  organisasjonsnummer: info.organisasjonsnummer,
                  startdato: ISODateToDate(info.startdato),
                  sluttdato: info.sluttdato ? ISODateToDate(info.sluttdato) : undefined,
              }
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
                arbeidstaker: getOppgjeningsaktivitetArbeidstaker(ytelse.arbeidstid.arbeidstakerList),
                frilanser: ytelse.arbeidstid.frilanserArbeidstidInfo
                    ? getOpptjeningsaktivitetFrilanser(
                          ytelse.arbeidstid.frilanserArbeidstidInfo,
                          ytelse.opptjeningAktivitet.frilanser
                      )
                    : undefined,
                selvstendig: ytelse.arbeidstid.selvstendigNæringsdrivendeArbeidstidInfo
                    ? getOppgjeningsaktivitetSelvstendig(
                          ytelse.arbeidstid.selvstendigNæringsdrivendeArbeidstidInfo,
                          ytelse.opptjeningAktivitet.selvstendig
                      )
                    : undefined,
            },
            tilsynsordning: {
                enkeltdager: getTilsynsdagerFromK9Format(ytelse.tilsynsordning.perioder),
            },
            arbeidstid: {
                arbeidstakerMap: getArbeidstidArbeidsgivere(ytelse.arbeidstid.arbeidstakerList, søknadsperioder),
                frilanser: ytelse.arbeidstid.frilanserArbeidstidInfo?.perioder
                    ? getAktivitetArbeidstidFromK9Format(
                          ytelse.arbeidstid.frilanserArbeidstidInfo.perioder,
                          søknadsperioder
                      )
                    : undefined,
                selvstendig: ytelse.arbeidstid.selvstendigNæringsdrivendeArbeidstidInfo?.perioder
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
