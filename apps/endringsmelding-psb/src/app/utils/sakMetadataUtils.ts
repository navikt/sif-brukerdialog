import {
    DateRange,
    dateToISODate,
    getDateRangeFromDateRanges,
    getDateRangesBetweenDateRanges,
    getDatesInDateRange,
    getDatesInMonthOutsideDateRange,
    getMonthDateRange,
    getMonthsInDateRange,
    getYearMonthKey,
    getYearsInDateRanges,
    ISODateToDate,
} from '@navikt/sif-common-utils/lib';
import flatten from 'lodash.flatten';
import { DagerIkkeSøktForMap, DagerSøktForMap } from '../types';
import { MånedMedSøknadsperioderMap, SakMetadata } from '../types/Sak';
import { getEndringsperiode } from './endringsperiode';

const getUtilgjengeligeDatoerIMåned = (
    utilgjengeligeDatoer: Date[],
    måned: Date,
    endringsperiode: DateRange
): Date[] => {
    const yearMonthKey = getYearMonthKey(måned);
    return [
        ...getDatesInMonthOutsideDateRange(måned, endringsperiode),
        ...utilgjengeligeDatoer.filter((d) => getYearMonthKey(d) === yearMonthKey),
    ];
};

const getDagerIkkeSøktFor = (søknadsperioder: DateRange[]): DagerIkkeSøktForMap => {
    const hull = getDateRangesBetweenDateRanges(søknadsperioder);
    const dagerIkkeSøktFor: DagerIkkeSøktForMap = {};
    hull.forEach((periode) => {
        const datoer = getDatesInDateRange(periode, false);
        datoer.forEach((d) => (dagerIkkeSøktFor[dateToISODate(d)] = true));
    });
    return dagerIkkeSøktFor;
};

const getDagerSøktFor = (søknadsperioder: DateRange[]): DagerSøktForMap => {
    const dagerSøktFor: DagerSøktForMap = {};
    søknadsperioder.forEach((periode) => {
        const datoer = getDatesInDateRange(periode, true);
        datoer.forEach((d) => (dagerSøktFor[dateToISODate(d)] = true));
    });
    return dagerSøktFor;
};

const getMånederMedSøknadsperioder = (søknadsperioder: DateRange[]): MånedMedSøknadsperioderMap => {
    const måneder: MånedMedSøknadsperioderMap = {};
    flatten(søknadsperioder.map((periode) => getMonthsInDateRange(periode))).forEach((periode) => {
        const key = getYearMonthKey(periode.from);
        måneder[key] = måneder[key] ? [...måneder[key], periode] : [periode];
    });
    return måneder;
};

const getDateRangeFromYearMonthKey = (yearMonthKey: string): DateRange => {
    const [year, month] = yearMonthKey.split('-');
    return getMonthDateRange(new Date(parseInt(year, 10), parseInt(month, 10) - 1));
};

export const getSakMetadata = (endringsdato: Date, søknadsperioder: DateRange[]): SakMetadata => {
    const endringsperiode = getEndringsperiode(endringsdato, søknadsperioder);
    const dagerIkkeSøktForMap = getDagerIkkeSøktFor(søknadsperioder);
    const dagerSøktForMap = getDagerSøktFor(søknadsperioder);
    const alleMånederISøknadsperiode = getMonthsInDateRange(getDateRangeFromDateRanges(søknadsperioder));
    const månederMedSøknadsperiodeMap = getMånederMedSøknadsperioder(søknadsperioder);
    const antallMånederUtenSøknadsperiode =
        alleMånederISøknadsperiode.length - Object.keys(månederMedSøknadsperiodeMap).length;
    const søknadsperioderGårOverFlereÅr = getYearsInDateRanges(alleMånederISøknadsperiode).length > 1;
    const datoerIkkeSøktFor: Date[] = Object.keys(dagerIkkeSøktForMap).map((dato) => ISODateToDate(dato));
    const datoerIkkeSøktForIMåned = {};

    Object.keys(månederMedSøknadsperiodeMap).forEach((key) => {
        const måned = getDateRangeFromYearMonthKey(key);
        datoerIkkeSøktForIMåned[key] = getUtilgjengeligeDatoerIMåned(datoerIkkeSøktFor, måned.from, endringsperiode);
    });

    return {
        endringsdato,
        endringsperiode,
        søknadsperioder,
        dagerIkkeSøktForMap,
        dagerSøktForMap,
        månederMedSøknadsperiodeMap,
        alleMånederISøknadsperiode,
        søknadsperioderGårOverFlereÅr,
        antallMånederUtenSøknadsperiode,
        datoerIkkeSøktFor,
        datoerIkkeSøktForIMåned,
    };
};
