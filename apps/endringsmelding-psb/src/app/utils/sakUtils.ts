import { DateRange, getDateRangeFromDateRanges, isDateInDateRange, ISODateToDate } from '@navikt/sif-common-utils';
import { DagerIkkeSøktForMap } from '../types';
import { Arbeidsgiver } from '../types/Arbeidsgiver';
import { ArbeidstakerMap, ArbeidstidEnkeltdagSak, Sak, SakMedMeta, YtelseArbeidstid } from '../types/Sak';
import { getEndringsdato, getMaksEndringsperiode } from './endringsperiode';
import { getSakMetadata } from './sakMetadataUtils';

type ISODateObject = { [key: string]: any };

export const getISODateObjectsWithinDateRange = <E extends ISODateObject>(
    data: E,
    dateRange: DateRange,
    getDagerIkkeSøktFor: DagerIkkeSøktForMap
): E => {
    const result = {};
    Object.keys(data).forEach((isoDate) => {
        const date = ISODateToDate(isoDate);
        if (typeof date === 'string') {
            throw new Error('Invalid formatted date');
        }
        if (isDateInDateRange(date, dateRange) && getDagerIkkeSøktFor[isoDate] === undefined) {
            result[isoDate] = data[isoDate];
        }
    });
    return result as E;
};

export const trimArbeidstidTilTillatPeriode = (
    arbeidstid: ArbeidstidEnkeltdagSak,
    maksEndringsperiode: DateRange,
    dagerIPeriodeDetIkkeErSøktFor: DagerIkkeSøktForMap
): ArbeidstidEnkeltdagSak => {
    const result: ArbeidstidEnkeltdagSak = {
        faktisk: getISODateObjectsWithinDateRange(
            arbeidstid.faktisk,
            maksEndringsperiode,
            dagerIPeriodeDetIkkeErSøktFor
        ),
        normalt: getISODateObjectsWithinDateRange(
            arbeidstid.normalt,
            maksEndringsperiode,
            dagerIPeriodeDetIkkeErSøktFor
        ),
    };
    return result;
};

export const erArbeidsgivereISakIAAreg = (arbeidsgivere: Arbeidsgiver[], arbeidsgivereMap?: ArbeidstakerMap): boolean =>
    arbeidsgivereMap !== undefined
        ? Object.keys(arbeidsgivereMap).some((orgnr) => arbeidsgivere.some((a) => a.id === orgnr) === false) === false
        : false;

export const harSakArbeidstidInfo = (arbeidsgivere: Arbeidsgiver[], arbeidstidSak: YtelseArbeidstid): boolean => {
    const arbeidsgivereErBådeISakOgAAreg = erArbeidsgivereISakIAAreg(arbeidsgivere, arbeidstidSak.arbeidstakerMap);
    return (
        arbeidsgivereErBådeISakOgAAreg ||
        arbeidstidSak.frilanser !== undefined ||
        arbeidstidSak.selvstendig !== undefined
    );
};

export const getSakMedMetadata = (opprinneligSak: Sak): SakMedMeta => {
    const sak: Sak = { ...opprinneligSak };
    const endringsdato = getEndringsdato();
    const maksEndringsperiode = getMaksEndringsperiode(endringsdato);
    const {
        ytelse: {
            søknadsperioder,
            arbeidstid: { arbeidstakerMap: arbeidsgivere },
            tilsynsordning: { enkeltdager: tilsynEnkeltdager },
        },
    } = sak;

    const meta = getSakMetadata(endringsdato, søknadsperioder);
    const { dagerIkkeSøktForMap: dagerIkkeSøktFor } = meta;

    /** Trim arbeidstid ansatt */
    if (arbeidsgivere) {
        const trimmedArbeidsgiverTid: ArbeidstakerMap = {};
        Object.keys(arbeidsgivere).forEach((key) => {
            trimmedArbeidsgiverTid[key] = trimArbeidstidTilTillatPeriode(
                arbeidsgivere[key],
                maksEndringsperiode,
                meta.dagerIkkeSøktForMap
            );
        });
        sak.ytelse.arbeidstid.arbeidstakerMap = trimmedArbeidsgiverTid;
    }

    /** Trim tilsynsordning */
    if (tilsynEnkeltdager) {
        sak.ytelse.tilsynsordning.enkeltdager = getISODateObjectsWithinDateRange(
            tilsynEnkeltdager,
            maksEndringsperiode,
            dagerIkkeSøktFor
        );
    }

    return { sak, meta };
};

export const getArbeidsgivereISak = (arbeidsgivere: Arbeidsgiver[], sak: Sak): Arbeidsgiver[] => {
    const { arbeidstakerMap } = sak.ytelse.arbeidstid;
    if (arbeidstakerMap === undefined) {
        return [];
    }
    return arbeidsgivere.filter((a) => {
        return arbeidstakerMap[a.id] !== undefined;
    });
};
// export const getNyeArbeidsforholdIkkeRegistrertISak = (
//     arbeidsgivere: Arbeidsgiver[],
//     k9FormtArbeidsgivere: K9FormatArbeidsgiver[]
// ): Arbeidsgiver[] => {
//     return arbeidsgivere.filter(
//         ({ id }) =>
//             k9FormatArbeidsgivere.some((k9a) => {
//                 const ident = getK9FormatArbeidsgiverIdent(k9a);
//                 return ident ? ident === id : true;
//             }) === false
//     );
// };

// export const getK9FormatArbeidsgiverIdent = (arbeidsgiver: K9FormatArbeidsgiver): string => {
//     if (isK9FormatArbeidsgiverPrivat(arbeidsgiver)) {
//         return arbeidsgiver.norskIdentitetsnummer;
//     }
//     if (isK9FormatArbeidsgiverOrganisasjon(arbeidsgiver)) {
//         return arbeidsgiver.organisasjonsnummer;
//     }
//     throw new Error('Ukjent ident for arbeidsgiver');
// };

export const getDateRangeForSaker = (saker: Sak[]): DateRange | undefined => {
    if (saker.length === 0) {
        return undefined;
    }
    const sakerDateRanges = saker
        .filter((sak) => sak.ytelse.søknadsperioder.length > 0)
        .map((sak) => {
            return getDateRangeFromDateRanges(sak.ytelse.søknadsperioder);
        });
    return sakerDateRanges.length === 0 ? undefined : getDateRangeFromDateRanges(sakerDateRanges);
};

// export const getArbeidsgivereISaker = (saker: Sak[]): ArbeidstidArbeidsgiver[] => {
//     const arbeidsgivere: Arbeidsgiver[] = [];
//     saker.forEach((sak) => {
//         const { arbeidstakerMap } = sak.ytelse.arbeidstid;
//         if (arbeidstakerMap) {
//             Object.keys(arbeidstakerMap).forEach((id) => {
//                 const
//             });
//         }
//     });

//     return arbeidsgivere;
// };
