import { ISODate, ISODateRange, ISODuration } from '@navikt/sif-common-utils/lib';
import { isObject, isString } from 'formik';
import { isArray } from 'lodash';
import { isISODateOrNull, isISODateRange, isISODuration, isStringOrNull } from '../utils/typeGuardUtilities';

interface K9FormatTilsynsordningPerioder {
    [isoDateRange: ISODateRange]: { etablertTilsynTimerPerDag: ISODuration };
}

export interface K9FormatArbeidstidTid {
    jobberNormaltTimerPerDag: ISODuration;
    faktiskArbeidTimerPerDag: ISODuration;
}

export interface K9FormatArbeidstidInfoPerioder {
    [isoDateRange: ISODateRange]: K9FormatArbeidstidTid;
}

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

interface K9FormatYtelseIkkeIBruk {
    endringsperiode: any;
    trekkKravPerioder: any;
    dataBruktTilUtledning: any; // Bekreftet opplysninger etc fra dialogen
    infoFraPunsj: any;
    bosteder: any;
    utenlandsopphold: any;
    beredskap: any;
    nattevåk: any;
    lovbestemtFerie: any;
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

const isK9FormatBarn = (barn: any): barn is K9FormatBarn => {
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
    return false;
};

const isK9FormatArbeidstidTid = (tid: any): tid is K9FormatArbeidstidTid => {
    const t = tid as K9FormatArbeidstidTid;
    if (isObject(t) && isISODuration(t.faktiskArbeidTimerPerDag) && isISODuration(t.jobberNormaltTimerPerDag)) {
        return true;
    }
    return false;
};

const isK9FormatArbeidstidPerioder = (perioder: any): perioder is K9FormatArbeidstidInfoPerioder => {
    if (isObject(perioder)) {
        const keys = Object.keys(perioder);
        const harUgyldigISODateRangeKey = itemsAreValidISODateRanges(keys) === false;
        if (harUgyldigISODateRangeKey) {
            return false;
        }
        const harUgyldigArbeidstid = keys
            .map((key) => perioder[key])
            .some((tid: K9FormatArbeidstidTid) => {
                return isK9FormatArbeidstidTid(tid) === false;
            });

        return harUgyldigArbeidstid === false;
    }
    return false;
};

const isK9FormatArbeidstidInfo = (arbeidstidInfo: any): arbeidstidInfo is K9FormatArbeidstidInfo => {
    const info = arbeidstidInfo as K9FormatArbeidstidInfo;
    if (isObject(info) && (info.perioder === undefined || isK9FormatArbeidstidPerioder(info.perioder))) {
        return true;
    }
    return false;
};

const isK9FormatArbeidstaker = (arbeidstaker: any): arbeidstaker is K9FormatArbeidstaker => {
    const a = arbeidstaker as K9FormatArbeidstaker;
    if (isObject(a)) {
        if (
            (isString(a.organisasjonsnummer) || isString(a.norskIdentitetsnummer)) &&
            isK9FormatArbeidstidInfo(a.arbeidstidInfo)
        ) {
            return true;
        }
        return false;
    }
    return false;
};

const isK9FormatArbeidstid = (arbeidstid: any): arbeidstid is K9FormatArbeidstid => {
    const arb = arbeidstid as K9FormatArbeidstid;
    if (isObject(arb) && isArray(arb.arbeidstakerList)) {
        if (arb.arbeidstakerList.length > 0) {
            if (arb.arbeidstakerList.some((a) => !isK9FormatArbeidstaker(a))) {
                return false;
            }
        }
        if (isObject(arb.frilanserArbeidstidInfo) && isK9FormatArbeidstidInfo(arb.frilanserArbeidstidInfo) === false) {
            return false;
        }
        if (
            isObject(arb.selvstendigNæringsdrivendeArbeidstidInfo) &&
            isK9FormatArbeidstidInfo(arb.selvstendigNæringsdrivendeArbeidstidInfo) === false
        ) {
            return false;
        }
        return true;
    }
    return false;
};

const isSøknadsperioder = (perioder: any): perioder is ISODateRange[] => {
    if (isArray(perioder) && itemsAreValidISODateRanges(perioder)) {
        return true;
    }
    return false;
};

const isK9FormatTilsynsordningPerioder = (perioder: any): perioder is K9FormatTilsynsordningPerioder => {
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
    return false;
};

const isK9FormatTilsynsordning = (tilsynsordning: any): boolean => {
    if (isObject(tilsynsordning) && isK9FormatTilsynsordningPerioder(tilsynsordning.perioder)) {
        return true;
    }
    return false;
};

const isK9FormatYtelse = (ytelse: any): ytelse is K9FormatYtelse => {
    const maybeYtelse = ytelse as K9FormatYtelse;

    if (
        isObject(maybeYtelse) &&
        maybeYtelse.type === 'PLEIEPENGER_SYKT_BARN' &&
        isSøknadsperioder(maybeYtelse.søknadsperiode) &&
        isObject(maybeYtelse.barn) &&
        isISODateOrNull(maybeYtelse.barn.fødselsdato) &&
        isString(maybeYtelse.barn.norskIdentitetsnummer) &&
        isK9FormatTilsynsordning(maybeYtelse.tilsynsordning) &&
        isK9FormatArbeidstid(maybeYtelse.arbeidstid) &&
        true
    ) {
        return true;
    }
    return false;
};

export const isK9Format = (sak: any): sak is K9Format => {
    const maybeK9Sak = sak as K9Format;
    if (
        isObject(maybeK9Sak) &&
        isK9FormatBarn(maybeK9Sak.barn) &&
        isObject(maybeK9Sak.søknad) &&
        isK9FormatYtelse(maybeK9Sak.søknad.ytelse)
    ) {
        return true;
    } else {
        return false;
    }
};
