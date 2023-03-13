import {
    DateRange,
    dateRangeUtils,
    dateToISODate,
    getIsoDateRangeMapFromDateRanges,
    ISODate,
    ISODateRangeMap,
    ISODateToDate,
    sortDates,
} from '@navikt/sif-common-utils/lib';
import { LovbestemtFerieApiData, LovbestemtFerieEndringType } from '../../types/søknadApiData/SøknadApiData';

const isoDateIsNotInArray = (isoDate: ISODate, isoDateArray: ISODate[]) =>
    isoDateArray.some((dMelding) => isoDate === dMelding) === false;

export const getLovbestemtFerieApiDataFromSøknadsdata = (
    perioderIMelding: DateRange[],
    perioderISak: DateRange[]
): LovbestemtFerieApiData => {
    const dagerIMelding: ISODate[] = dateRangeUtils
        .getDatesInDateRanges(perioderIMelding)
        .sort(sortDates)
        .map(dateToISODate);
    const dagerISak: ISODate[] = dateRangeUtils.getDatesInDateRanges(perioderISak).map(dateToISODate);

    const dagerFjernet = dagerISak.filter((d) => isoDateIsNotInArray(d, dagerIMelding));
    const dagerLagtTil = dagerIMelding.filter((d) => isoDateIsNotInArray(d, dagerISak));

    const perioderLagtTil: ISODateRangeMap<object> = getIsoDateRangeMapFromDateRanges(
        dateRangeUtils.getDateRangesFromDates(dagerLagtTil.map(ISODateToDate)),
        {}
    );

    const perioderFjernet: ISODateRangeMap<object> = getIsoDateRangeMapFromDateRanges(
        dateRangeUtils.getDateRangesFromDates(dagerFjernet.map(ISODateToDate)),
        {}
    );

    const perioder: ISODateRangeMap<LovbestemtFerieEndringType> = {};
    Object.keys(perioderLagtTil).forEach((key) => (perioder[key] = LovbestemtFerieEndringType.ny));
    Object.keys(perioderFjernet).forEach((key) => (perioder[key] = LovbestemtFerieEndringType.slettet));

    return {
        dagerFjernet,
        dagerLagtTil,
        perioderFjernet,
        perioderLagtTil,
        perioder,
    };
};
