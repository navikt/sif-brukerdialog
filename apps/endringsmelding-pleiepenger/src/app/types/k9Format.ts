import { UtenlandsoppholdÅrsak } from '@navikt/sif-common-forms-ds/lib/forms/utenlandsopphold/types';
import {
    isISODateOrNull,
    isISODateRange,
    isISODuration,
    ISODateRangeMap,
    isStringOrNull,
} from '@navikt/sif-common-utils';
import { ISODate, ISODateRange, ISODuration } from '@navikt/sif-common-utils/lib';
import { isObject, isString } from 'formik';
import { isArray } from 'lodash';

type K9FormatTilsynsordningPerioder = ISODateRangeMap<{ etablertTilsynTimerPerDag: ISODuration }>;

export interface K9FormatArbeidstidTid {
    jobberNormaltTimerPerDag: ISODuration;
    faktiskArbeidTimerPerDag: ISODuration;
}

export type K9FormatArbeidstidInfoPerioder = ISODateRangeMap<K9FormatArbeidstidTid>;

export interface K9FormatArbeidstaker {
    norskIdentitetsnummer: string | null;
    organisasjonsnummer: string;
    arbeidstidInfo: K9FormatArbeidstidInfo;
}

interface K9FormatOpptjeningAktivitetFrilanser {
    startdato: ISODate;
    sluttdato?: ISODate;
    jobberFortsattSomFrilanser: boolean;
}

interface K9FormatOpptjeningAktivitetSelvstendig {
    startdato: ISODate;
    sluttdato?: ISODate;
    organisasjonsnummer: string;
}

export type K9FormatUtenlandsoppholdPerioder = ISODateRangeMap<K9FormatUtenlandsopphold>;

interface K9FormatUtenlandsopphold {
    land: string;
    årsak: UtenlandsoppholdÅrsak;
}

export type K9FormatLovbestemtFerierPerioder = ISODateRangeMap<boolean | null>;

interface K9FormatYtelseIkkeIBruk {
    endringsperiode: any;
    trekkKravPerioder: any;
    dataBruktTilUtledning: any; // Bekreftet opplysninger etc fra dialogen
    infoFraPunsj: any;
    bosteder: any;
    beredskap: any;
    nattevåk: any;
    uttak: any;
    omsorg: any;
}
interface K9FormatYtelse {
    type: 'PLEIEPENGER_SYKT_BARN';
    barn: {
        norskIdentitetsnummer: string;
        fødselsdato: ISODate | null;
    };
    søknadsperiode: ISODateRange[];
    lovbestemtFerie: {
        perioder: K9FormatLovbestemtFerierPerioder;
    };
    utenlandsopphold: {
        perioder: K9FormatUtenlandsoppholdPerioder;
    };
    opptjeningAktivitet: {
        frilanser?: K9FormatOpptjeningAktivitetFrilanser;
        selvstendigNæringsdrivende?: K9FormatOpptjeningAktivitetSelvstendig;
    };
    tilsynsordning: {
        perioder: K9FormatTilsynsordningPerioder;
    };
    arbeidstid: K9FormatArbeidstid;
}

export interface K9FormatBarn {
    fødselsdato: ISODate;
    fornavn: string;
    mellomnavn: string | null;
    etternavn: string;
    aktørId: string;
    identitetsnummer: string;
}

export interface K9FormatArbeidstidInfo {
    perioder?: K9FormatArbeidstidInfoPerioder;
}
export interface K9FormatArbeidstid {
    arbeidstakerList: K9FormatArbeidstaker[];
    frilanserArbeidstidInfo: K9FormatArbeidstidInfo | null;
    selvstendigNæringsdrivendeArbeidstidInfo: K9FormatArbeidstidInfo | null;
}

export interface K9Format {
    barn: K9FormatBarn;
    søknad: {
        søknadId: string;
        versjon: string;
        mottattDato: string;
        søker: {
            norskIdentitetsnummer: string;
        };
        ytelse: K9FormatYtelse & K9FormatYtelseIkkeIBruk;
        språk: 'nb' | 'nn';
        journalposter: any;
        begrunnelseForInnsending: any;
    };
}

const itemsAreValidISODateRanges = (keys: string[]): boolean => keys.some((key) => !isISODateRange(key)) === false;

const verifyK9FormatBarn = (barn: any): barn is K9FormatBarn => {
    const maybeBarn = barn as K9FormatBarn;
    if (
        isObject(maybeBarn) &&
        isString(maybeBarn.fornavn) &&
        isStringOrNull(maybeBarn.mellomnavn) &&
        isString(maybeBarn.etternavn) &&
        isString(maybeBarn.aktørId) &&
        isString(maybeBarn.identitetsnummer)
    ) {
        return true;
    }
    throw 'verifyK9FormatBarn';
};

const verifyK9FormatArbeidstidTid = (tid: any): tid is K9FormatArbeidstidTid => {
    const t = tid as K9FormatArbeidstidTid;
    if (isObject(t) && isISODuration(t.faktiskArbeidTimerPerDag) && isISODuration(t.jobberNormaltTimerPerDag)) {
        return true;
    }
    throw `verifyK9FormatArbeidstidTid (${JSON.stringify(t)})`;
};

const verifyK9FormatArbeidstidPerioder = (perioder: any): perioder is K9FormatArbeidstidInfoPerioder => {
    if (isObject(perioder)) {
        const keys = Object.keys(perioder);
        const harUgyldigISODateRangeKey = itemsAreValidISODateRanges(keys) === false;
        if (harUgyldigISODateRangeKey) {
            throw 'verifyK9FormatArbeidstidPerioder.ugyldigISODateRange';
        }
        const harUgyldigArbeidstid = keys
            .map((key) => perioder[key])
            .some((tid: K9FormatArbeidstidTid) => {
                return verifyK9FormatArbeidstidTid(tid) === false;
            });

        if (harUgyldigArbeidstid === false) {
            return true;
        }
    }

    throw 'verifyK9FormatArbeidstidPerioder';
};

const verifyK9FormatArbeidstidInfo = (
    arbeidstidInfo: any,
    allowUndefinedPerioder = true
): arbeidstidInfo is K9FormatArbeidstidInfo => {
    const info = arbeidstidInfo as K9FormatArbeidstidInfo;
    if (
        isObject(info) &&
        ((allowUndefinedPerioder && info.perioder === undefined) || verifyK9FormatArbeidstidPerioder(info.perioder))
    ) {
        return true;
    }
    throw 'verifyK9FormatArbeidstidInfo';
};

const verifyK9FormatArbeidstaker = (arbeidstaker: any): arbeidstaker is K9FormatArbeidstaker => {
    const a = arbeidstaker as K9FormatArbeidstaker;
    if (isObject(a)) {
        if (
            (isString(a.organisasjonsnummer) || isString(a.norskIdentitetsnummer)) &&
            verifyK9FormatArbeidstidInfo(a.arbeidstidInfo, false)
        ) {
            return true;
        }
    }
    throw 'verifyK9FormatArbeidstaker';
};

const verifyK9FormatArbeidstid = (arbeidstid: any): arbeidstid is K9FormatArbeidstid => {
    const arb = arbeidstid as K9FormatArbeidstid;
    if (isObject(arb) && isArray(arb.arbeidstakerList)) {
        if (arb.arbeidstakerList.length > 0) {
            if (arb.arbeidstakerList.some((a) => !verifyK9FormatArbeidstaker(a))) {
                return false;
            }
        }
        if (
            isObject(arb.frilanserArbeidstidInfo) &&
            verifyK9FormatArbeidstidInfo(arb.frilanserArbeidstidInfo) === false
        ) {
            return false;
        }
        if (
            isObject(arb.selvstendigNæringsdrivendeArbeidstidInfo) &&
            verifyK9FormatArbeidstidInfo(arb.selvstendigNæringsdrivendeArbeidstidInfo) === false
        ) {
            return false;
        }
        return true;
    }
    throw 'verifyK9FormatArbeidstid';
};

const isSøknadsperioder = (perioder: any): perioder is ISODateRange[] => {
    if (isArray(perioder) && itemsAreValidISODateRanges(perioder)) {
        return true;
    }
    throw 'verifySøknadsperioder';
};

const verifyK9FormatTilsynsordning = (tilsynsordning: any, required = false): boolean => {
    if (required) {
        if (isObject(tilsynsordning) && verifyK9FormatTilsynsordningPerioder(tilsynsordning.perioder)) {
            return true;
        }
        throw 'verifyK9FormatTilsynsordning';
    }
    return true;
};

const verifyK9FormatTilsynsordningPerioder = (perioder: any): perioder is K9FormatTilsynsordningPerioder => {
    if (isObject(perioder)) {
        const keys = Object.keys(perioder);
        if (itemsAreValidISODateRanges(keys) === false) {
            return false;
        }
        const harUgyldigTilsynsordning = keys.some((key) => {
            const periode = perioder[key];
            return isObject(periode) === false || isISODuration(periode.etablertTilsynTimerPerDag) === false;
        });
        return harUgyldigTilsynsordning === false;
    }
    throw 'verifyK9FormatTilsynsordningPerioder';
};

const verifyK9FormatLovbestemtFerie = (ferie: any): boolean => {
    if (isObject(ferie) && isObject(ferie.perioder)) {
        if (itemsAreValidISODateRanges(Object.keys(ferie.perioder)) === false) {
            throw 'verifyK9FormatLovbestemtFerie - invalid dateRange';
        }
        return true;
    }
    throw 'verifyK9FormatLovbestemtFerie - invalid format';
};

const verifyK9FormatUtenlandsopphold = (opphold: any): boolean => {
    if (isObject(opphold) && opphold.perioder) {
        const keys = Object.keys(opphold.perioder);
        if (itemsAreValidISODateRanges(keys) === false) {
            throw 'verifyK9FormatUtenlandsopphold - invalid dateRange';
        }
        const harUgyldigUtenlandsopphold = keys.some((key) => {
            const periode = opphold.perioder[key] as K9FormatUtenlandsopphold;
            if (isObject(periode) === false) {
                return true;
            }
            return false;
        });
        return harUgyldigUtenlandsopphold === false;
    }
    throw 'verifyK9FormatLovbestemtFerie - invalid format';
};

const verifyK9FormatYtelse = (ytelse: any): ytelse is K9FormatYtelse => {
    const maybeYtelse = ytelse as K9FormatYtelse;
    if (
        isObject(maybeYtelse) &&
        maybeYtelse.type === 'PLEIEPENGER_SYKT_BARN' &&
        isSøknadsperioder(maybeYtelse.søknadsperiode) &&
        isObject(maybeYtelse.barn) &&
        isISODateOrNull(maybeYtelse.barn.fødselsdato) &&
        isString(maybeYtelse.barn.norskIdentitetsnummer) &&
        verifyK9FormatTilsynsordning(maybeYtelse.tilsynsordning) &&
        verifyK9FormatArbeidstid(maybeYtelse.arbeidstid) &&
        verifyK9FormatLovbestemtFerie(maybeYtelse.lovbestemtFerie) &&
        verifyK9FormatUtenlandsopphold(maybeYtelse.utenlandsopphold) &&
        true
    ) {
        return true;
    }
    throw 'verifyK9FormatYtelse';
};

interface K9FormatError {
    type: 'k9formatError';
    error: any;
}
export const isK9FormatError = (error: any): error is K9FormatError => {
    return error && isObject(error) && error.type === 'k9formatError';
};

export const verifyK9Format = (sak: any): sak is K9Format => {
    const maybeK9Sak = sak as K9Format;
    try {
        if (
            isObject(maybeK9Sak) &&
            verifyK9FormatBarn(maybeK9Sak.barn) &&
            isObject(maybeK9Sak.søknad) &&
            verifyK9FormatYtelse(maybeK9Sak.søknad.ytelse)
        ) {
            return true;
        }
    } catch (error) {
        const k9FormatError: K9FormatError = {
            type: 'k9formatError',
            error: error,
        };
        throw k9FormatError;
    }
    return false;
};
