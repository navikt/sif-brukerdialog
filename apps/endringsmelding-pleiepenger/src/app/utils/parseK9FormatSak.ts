import { ISODateRangeToDateRange, ISODateToDate, ISODurationToDuration } from '@navikt/sif-common-utils/lib';
import dayjs from 'dayjs';
import { K9Format, K9FormatArbeidstid, K9FormatArbeidstidInfo, K9FormatBarn } from '../types/k9Format';
import {
    K9Sak2,
    K9Sak2Arbeidstid,
    K9Sak2ArbeidstidInfo,
    K9Sak2ArbeidstidPeriodeMap,
    K9Sak2Barn,
} from '../types/K9Sak2';

/**
 * Henter ut informasjon om barn fra k9sak
 * @param barn K9FormatBarn
 * @returns Barn
 */

const parseBarn = (barn: K9FormatBarn): K9Sak2Barn => {
    return {
        ...barn,
        fødselsdato: ISODateToDate(barn.fødselsdato),
        mellomnavn: barn.mellomnavn || undefined,
    };
};

export const parseArbeidstidInfo = (arbeidstid: K9FormatArbeidstidInfo): K9Sak2ArbeidstidInfo => {
    const { perioder = {} } = arbeidstid;
    const periodeMap: K9Sak2ArbeidstidPeriodeMap = {};

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
const parseArbeidstid = ({
    arbeidstakerList,
    frilanserArbeidstidInfo,
    selvstendigNæringsdrivendeArbeidstidInfo,
}: K9FormatArbeidstid): K9Sak2Arbeidstid => {
    return {
        arbeidstakerList: arbeidstakerList?.map((arbeidstaker) => ({
            organisasjonsnummer: arbeidstaker.organisasjonsnummer,
            norskIdentitetsnummer: arbeidstaker.norskIdentitetsnummer || undefined,
            arbeidstidInfo: parseArbeidstidInfo(arbeidstaker.arbeidstidInfo),
        })),
        frilanserArbeidstidInfo: frilanserArbeidstidInfo?.perioder
            ? parseArbeidstidInfo(frilanserArbeidstidInfo.perioder)
            : undefined,
        selvstendigNæringsdrivendeArbeidstidInfo: selvstendigNæringsdrivendeArbeidstidInfo?.perioder
            ? parseArbeidstidInfo(selvstendigNæringsdrivendeArbeidstidInfo.perioder)
            : undefined,
    };
};

/**
 * Parser K9Format sak
 * @param data data mottat fra backend
 * @returns K9Sak2
 */
export const parseK9FormatSak = (data: K9Format): K9Sak2 => {
    const {
        søknad: { ytelse, søker, søknadId },
        barn,
    } = data;
    const sak: K9Sak2 = {
        søker: søker,
        søknadId: søknadId,
        språk: data.søknad.språk,
        mottattDato: dayjs(data.søknad.mottattDato).toDate(),
        barn: parseBarn(data.barn),
        ytelse: {
            type: 'PLEIEPENGER_SYKT_BARN',
            barn: {
                norskIdentitetsnummer: barn.identitetsnummer,
                fødselsdato: barn.fødselsdato ? ISODateToDate(barn.fødselsdato) : undefined,
            },
            søknadsperioder: ytelse.søknadsperiode.map((periode) => ISODateRangeToDateRange(periode)),
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
            arbeidstid: parseArbeidstid(ytelse.arbeidstid),
        },
    };
    return sak;
};
