import {
    DateRange,
    dateRangeUtils,
    dateToISODate,
    getDatesInDateRanges,
    getIsoDateRangeMapFromDateRanges,
    ISODate,
    ISODateRangeMap,
    ISODateToDate,
    ISODuration,
    sortDates,
} from '@navikt/sif-common-utils/lib';
import {
    FERIE_FJERNET_DURATION,
    FERIE_LAGTTIL_DURATION,
    LovbestemtFerieApiData,
} from '../../types/søknadApiData/SøknadApiData';

const isoDateIsNotInArray = (isoDate: ISODate, isoDateArray: ISODate[]) =>
    isoDateArray.some((dMelding) => isoDate === dMelding) === false;

export const getLovbestemtFerieApiDataFromSøknadsdata = (
    perioderIMelding: DateRange[],
    perioderISak: DateRange[]
): LovbestemtFerieApiData => {
    const dagerIMelding: ISODate[] = getDatesInDateRanges(perioderIMelding).sort(sortDates).map(dateToISODate);
    const dagerISak: ISODate[] = getDatesInDateRanges(perioderISak).sort(sortDates).map(dateToISODate);

    const dagerFjernet = dagerISak.filter((d) => isoDateIsNotInArray(d, dagerIMelding));
    const dagerLagtTil = dagerIMelding.filter((d) => isoDateIsNotInArray(d, dagerISak));

    const perioderLagtTil: ISODateRangeMap<ISODuration> = getIsoDateRangeMapFromDateRanges(
        dateRangeUtils.getDateRangesFromDates(dagerLagtTil.map(ISODateToDate)),
        {}
    );

    const perioderFjernet: ISODateRangeMap<ISODuration> = getIsoDateRangeMapFromDateRanges(
        dateRangeUtils.getDateRangesFromDates(dagerFjernet.map(ISODateToDate)),
        {}
    );

    const perioder: ISODateRangeMap<ISODuration> = {};
    Object.keys(perioderLagtTil).forEach((key) => (perioder[key] = FERIE_LAGTTIL_DURATION));
    Object.keys(perioderFjernet).forEach((key) => (perioder[key] = FERIE_FJERNET_DURATION));

    return {
        dagerFjernet,
        dagerLagtTil,
        perioderFjernet,
        perioderLagtTil,
        perioder,
    };
};
