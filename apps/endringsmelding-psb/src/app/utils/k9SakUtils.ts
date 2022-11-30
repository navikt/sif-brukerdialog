import { DateRange, getDateRangeFromDateRanges } from '@navikt/sif-common-utils';
import { Arbeidsgiver } from '../types/Arbeidsgiver';
import { ArbeidstakerMap, K9Sak } from '../types/K9Sak';

export const erArbeidsgivereIK9SakOgIAAreg = (
    arbeidsgivere: Arbeidsgiver[],
    arbeidsgivereMap?: ArbeidstakerMap
): boolean =>
    arbeidsgivereMap !== undefined
        ? Object.keys(arbeidsgivereMap).some((orgnr) => arbeidsgivere.some((a) => a.id === orgnr) === false) === false
        : false;

export const getArbeidsgivereIK9Sak = (arbeidsgivere: Arbeidsgiver[], sak: K9Sak): Arbeidsgiver[] => {
    const { arbeidstakerMap } = sak.ytelse.arbeidstid;
    if (arbeidstakerMap === undefined) {
        return [];
    }
    return arbeidsgivere.filter((a) => {
        return arbeidstakerMap[a.id] !== undefined;
    });
};

export const getDateRangeForK9Saker = (saker: K9Sak[]): DateRange | undefined => {
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

// type ISODateObject = { [key: string]: any };

// export const getISODateObjectsWithinDateRange = <E extends ISODateObject>(
//     data: E,
//     dateRange: DateRange,
//     getDagerIkkeSøktFor: DagerIkkeSøktForMap
// ): E => {
//     const result = {};
//     Object.keys(data).forEach((isoDate) => {
//         const date = ISODateToDate(isoDate);
//         if (typeof date === 'string') {
//             throw new Error('Invalid formatted date');
//         }
//         if (isDateInDateRange(date, dateRange) && getDagerIkkeSøktFor[isoDate] === undefined) {
//             result[isoDate] = data[isoDate];
//         }
//     });
//     return result as E;
// };

// export const trimArbeidstidTilTillatPeriode = (
//     arbeidstid: ArbeidstidEnkeltdagSak,
//     maksEndringsperiode: DateRange,
//     dagerIPeriodeDetIkkeErSøktFor: DagerIkkeSøktForMap
// ): ArbeidstidEnkeltdagSak => {
//     const result: ArbeidstidEnkeltdagSak = {
//         faktisk: getISODateObjectsWithinDateRange(
//             arbeidstid.faktisk,
//             maksEndringsperiode,
//             dagerIPeriodeDetIkkeErSøktFor
//         ),
//         normalt: getISODateObjectsWithinDateRange(
//             arbeidstid.normalt,
//             maksEndringsperiode,
//             dagerIPeriodeDetIkkeErSøktFor
//         ),
//     };
//     return result;
// };

// export const harSakArbeidstidInfo = (arbeidsgivere: Arbeidsgiver[], arbeidstidSak: YtelseArbeidstid): boolean => {
//     const arbeidsgivereErBådeISakOgAAreg = erArbeidsgivereISakIAAreg(arbeidsgivere, arbeidstidSak.arbeidstakerMap);
//     return (
//         arbeidsgivereErBådeISakOgAAreg ||
//         arbeidstidSak.frilanser !== undefined ||
//         arbeidstidSak.selvstendig !== undefined
//     );
// };

// export const getSakMedMetadata = (opprinneligSak: K9Sak): SakMedMeta => {
//     const sak: K9Sak = { ...opprinneligSak };
//     const endringsdato = getEndringsdato();
//     const maksEndringsperiode = getMaksEndringsperiode(endringsdato);
//     const {
//         ytelse: {
//             søknadsperioder,
//             arbeidstid: { arbeidstakerMap: arbeidsgivere },
//             tilsynsordning: { enkeltdager: tilsynEnkeltdager },
//         },
//     } = sak;

//     const meta = getSakMetadata(endringsdato, søknadsperioder);
//     const { dagerIkkeSøktForMap: dagerIkkeSøktFor } = meta;

//     /** Trim arbeidstid ansatt */
//     if (arbeidsgivere) {
//         const trimmedArbeidsgiverTid: ArbeidstakerMap = {};
//         Object.keys(arbeidsgivere).forEach((key) => {
//             trimmedArbeidsgiverTid[key] = trimArbeidstidTilTillatPeriode(
//                 arbeidsgivere[key],
//                 maksEndringsperiode,
//                 meta.dagerIkkeSøktForMap
//             );
//         });
//         sak.ytelse.arbeidstid.arbeidstakerMap = trimmedArbeidsgiverTid;
//     }

//     /** Trim tilsynsordning */
//     if (tilsynEnkeltdager) {
//         sak.ytelse.tilsynsordning.enkeltdager = getISODateObjectsWithinDateRange(
//             tilsynEnkeltdager,
//             maksEndringsperiode,
//             dagerIkkeSøktFor
//         );
//     }

//     return { sak, meta };
// };
