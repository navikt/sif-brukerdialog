import { durationUtils, ISODateRangeToDateRange, ISODateToDate, ISODurationToDuration } from '@navikt/sif-common-utils';
import {
    K9Format,
    K9FormatArbeidstid,
    K9FormatArbeidstidInfo,
    K9FormatBarn,
    K9FormatLovbestemtFeriePerioder,
    K9FormatUtenlandsoppholdPerioder,
    K9Sak,
    K9SakArbeidstid,
    K9SakArbeidstidInfo,
    K9SakArbeidstidPeriodeMap,
    K9SakBarn,
    K9SakLovbestemtFerie,
    K9SakUtenlandsopphold,
} from '@types';
import dayjs from 'dayjs';

/**
 * Henter ut informasjon om barn fra k9sak
 * @param barn K9FormatBarn
 * @returns Barn
 */

export const parseK9FormatBarn = (barn: K9FormatBarn): K9SakBarn => {
    return {
        ...barn,
        fødselsdato: ISODateToDate(barn.fødselsdato),
        mellomnavn: barn.mellomnavn || undefined,
    };
};

export const parseK9FormatArbeidstidInfo = (arbeidstid: K9FormatArbeidstidInfo): K9SakArbeidstidInfo => {
    const { perioder = {} } = arbeidstid;
    const periodeMap: K9SakArbeidstidPeriodeMap = {};

    Object.keys(perioder).forEach((key) => {
        const periode = perioder[key];
        periodeMap[key] = {
            faktiskArbeidTimerPerDag: ISODurationToDuration(periode.faktiskArbeidTimerPerDag),
            jobberNormaltTimerPerDag: ISODurationToDuration(periode.jobberNormaltTimerPerDag),
        };
    });

    return {
        perioder: periodeMap,
    };
};
/**
 *
 * @param arbeidstid: K9FormatArbeidstid
 * @returns YtelseArbeidstid
 */
export const parseK9FormatArbeidstid = ({
    arbeidstakerList,
    frilanserArbeidstidInfo,
    selvstendigNæringsdrivendeArbeidstidInfo,
}: K9FormatArbeidstid): K9SakArbeidstid => {
    return {
        arbeidstakerList: arbeidstakerList?.map((arbeidstaker) => ({
            organisasjonsnummer: arbeidstaker.organisasjonsnummer,
            norskIdentitetsnummer: arbeidstaker.norskIdentitetsnummer || undefined,
            arbeidstidInfo: parseK9FormatArbeidstidInfo(arbeidstaker.arbeidstidInfo),
        })),
        frilanserArbeidstidInfo: frilanserArbeidstidInfo?.perioder
            ? parseK9FormatArbeidstidInfo(frilanserArbeidstidInfo)
            : undefined,
        selvstendigNæringsdrivendeArbeidstidInfo: selvstendigNæringsdrivendeArbeidstidInfo?.perioder
            ? parseK9FormatArbeidstidInfo(selvstendigNæringsdrivendeArbeidstidInfo)
            : undefined,
    };
};

export const harNormalarbeidstidIK9SakArbeidstidInfo = (arbeidstidInfo?: K9SakArbeidstidInfo): boolean => {
    if (!arbeidstidInfo) {
        return false;
    }
    const { perioder } = arbeidstidInfo;
    const keys = Object.keys(perioder);
    return keys.map((key) => perioder[key].jobberNormaltTimerPerDag).some(durationUtils.durationIsGreatherThanZero);
};

/** Hvis det kun er oppgitt 0 timer som normalarbeidstid, fjernes arbeidstidsinfoen, og en kan ikke endre disse arbeidsforholdene. */

export const fjernK9SakArbeidstidMedIngenNormalarbeidstid = (arbeidstid: K9SakArbeidstid): K9SakArbeidstid => {
    const { arbeidstakerList, frilanserArbeidstidInfo, selvstendigNæringsdrivendeArbeidstidInfo } = arbeidstid;

    return {
        arbeidstakerList: arbeidstakerList?.filter((a) => harNormalarbeidstidIK9SakArbeidstidInfo(a.arbeidstidInfo)),
        frilanserArbeidstidInfo: harNormalarbeidstidIK9SakArbeidstidInfo(frilanserArbeidstidInfo)
            ? frilanserArbeidstidInfo
            : undefined,
        selvstendigNæringsdrivendeArbeidstidInfo: harNormalarbeidstidIK9SakArbeidstidInfo(
            selvstendigNæringsdrivendeArbeidstidInfo,
        )
            ? selvstendigNæringsdrivendeArbeidstidInfo
            : undefined,
    };
};

/**
 *
 * @param arbeidstid Parse utenlandsopphold
 * @returns
 */
export const parseK9FormatUtenlandsopphold = (
    utenlandsoppholdMap: K9FormatUtenlandsoppholdPerioder,
): K9SakUtenlandsopphold[] => {
    return Object.keys(utenlandsoppholdMap).map((key) => {
        const utenlandsopphold = utenlandsoppholdMap[key];
        return {
            id: key,
            periode: ISODateRangeToDateRange(key),
            land: utenlandsopphold.land,
            årsak: utenlandsopphold.årsak,
        };
    });
};
/**
 *
 * @param arbeidstid Parse lovbestemtFerie
 * @returns K9FormatLovbestemtFeriePerioder[]
 */
export const parseK9FormatLovbestemtFerie = (perioder: K9FormatLovbestemtFeriePerioder): K9SakLovbestemtFerie[] => {
    return Object.keys(perioder)
        .filter((key) => perioder[key].skalHaFerie !== null)
        .map((key) => ({
            ...ISODateRangeToDateRange(key),
            liggerISak: true,
            skalHaFerie: perioder[key].skalHaFerie === true,
        }));
};
/**
 * Parser K9Format
 * @param data data mottat fra backend
 * @returns K9Sak
 */
export const parseK9Format = (data: K9Format): K9Sak => {
    const {
        søknad: { ytelse, søker, søknadId },
        barn,
    } = data;

    const sak: K9Sak = {
        søker: søker,
        søknadId: søknadId,
        språk: data.søknad.språk,
        mottattDato: dayjs(data.søknad.mottattDato).toDate(),
        barn: parseK9FormatBarn(data.barn),
        ytelse: {
            type: 'PLEIEPENGER_SYKT_BARN',
            barn: {
                norskIdentitetsnummer: barn.identitetsnummer,
                fødselsdato: barn.fødselsdato ? ISODateToDate(barn.fødselsdato) : undefined,
            },
            søknadsperioder: ytelse.søknadsperiode.map(ISODateRangeToDateRange),
            lovbestemtFerie: {
                perioder: parseK9FormatLovbestemtFerie(ytelse.lovbestemtFerie.perioder),
            },
            utenlandsopphold: {
                perioder: parseK9FormatUtenlandsopphold(data.søknad.ytelse.utenlandsopphold.perioder),
            },
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
            arbeidstid: fjernK9SakArbeidstidMedIngenNormalarbeidstid(parseK9FormatArbeidstid(ytelse.arbeidstid)),
        },
    };
    return sak;
};
