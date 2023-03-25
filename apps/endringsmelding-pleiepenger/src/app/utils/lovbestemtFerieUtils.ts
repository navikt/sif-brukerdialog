import {
    DateRange,
    dateRangesCollide,
    dateRangeUtils,
    dateToISODate,
    getDateRangesWithinDateRange,
    getDatesInDateRanges,
    ISODate,
    ISODateToDate,
    sortDateRange,
    sortDates,
} from '@navikt/sif-common-utils/lib';
import { uniqBy } from 'lodash';
import { LovbestemtFerieEndringer } from '../types/LovbestemFerieEndringer';
import { LovbestemtFeriePeriode } from '../types/Sak';
import { LovbestemtFerieSøknadsdata } from '../types/søknadsdata/LovbestemtFerieSøknadsdata';
import { getFeriedagerIPeriode } from './ferieUtils';

const isoDateIsNotInArray = (isoDate: ISODate, isoDateArray: ISODate[]) =>
    isoDateArray.some((dMelding) => isoDate === dMelding) === false;

const isoDateIsInArray = (isoDate: ISODate, isoDateArray: ISODate[]) =>
    isoDateArray.some((dMelding) => isoDate === dMelding) === true;

export const getLovbestemtFerieEndringer = (
    perioderIMelding: LovbestemtFeriePeriode[],
    perioderISak: LovbestemtFeriePeriode[]
): LovbestemtFerieEndringer => {
    const dagerIMelding: ISODate[] = getDatesInDateRanges(perioderIMelding.filter((d) => d.skalHaFerie === true))
        .sort(sortDates)
        .map(dateToISODate);
    const dagerISak: ISODate[] = getDatesInDateRanges(perioderISak).sort(sortDates).map(dateToISODate);

    const dagerFjernet = dagerISak.filter((d) => isoDateIsNotInArray(d, dagerIMelding)).map(ISODateToDate);
    const dagerLagtTil = dagerIMelding.filter((d) => isoDateIsNotInArray(d, dagerISak)).map(ISODateToDate);
    const dagerUendret = dagerISak.filter((d) => isoDateIsInArray(d, dagerIMelding)).map(ISODateToDate);

    const dagerMedFerie = uniqBy([...dagerLagtTil, ...dagerUendret], dateToISODate).sort(sortDates);

    const perioderFjernet: DateRange[] = dateRangeUtils.getDateRangesFromDates(dagerFjernet);
    const perioderLagtTil: DateRange[] = dateRangeUtils.getDateRangesFromDates(dagerLagtTil);
    const perioderUendret: DateRange[] = dateRangeUtils.getDateRangesFromDates(dagerUendret);

    const perioderMedFerie = dateRangeUtils.getDateRangesFromDates(dagerMedFerie);
    const perioder: LovbestemtFeriePeriode[] = [
        ...perioderFjernet.map((p) => ({ ...p, skalHaFerie: false })),
        ...perioderMedFerie.map((p) => ({ ...p, skalHaFerie: true })),
    ].sort(sortDateRange);

    return {
        erEndret: dagerFjernet.length > 0 || dagerLagtTil.length > 0,
        perioder,
        dagerFjernet,
        dagerLagtTil,
        dagerUendret,
        perioderFjernet,
        perioderLagtTil,
        perioderUendret,
    };
};
// export const getLovbestemtFerieEndringer = (
//     perioderIMelding: LovbestemtFeriePeriode[],
//     perioderISak: LovbestemtFeriePeriode[]
// ): LovbestemtFerieEndringer => {
//     const dagerISak: Feriedag[] = getDatesInDateRanges(perioderISak)
//         .sort(sortDates)
//         .map((dato) => ({
//             dato,
//             skalHaFerie: true,
//             liggerISak: true,
//         }));

//     const dagerLagtTil: Feriedag[] = getDatesInDateRanges(perioderIMelding.filter((d) => d.skalHaFerie === true)).map(
//         (dato) => ({
//             skalHaFerie: true,
//             liggerISak: dagerISak.some((dag) => dayjs(dag.dato).isSame(dato, 'day')),
//             dato,
//         })
//     );

//     const dagerFjernet: Feriedag[] = getDatesInDateRanges(perioderIMelding.filter((d) => d.skalHaFerie === false)).map(
//         (dato) => ({
//             skalHaFerie: true,
//             liggerISak: dagerISak.some((dag) => dayjs(dag.dato).isSame(dato, 'day')),
//             dato,
//         })
//     );

//     // const dagerIMelding: ISODate[] = getDatesInDateRanges(perioderIMelding.filter((d) => d.skalHaFerie === true))
//     //     .sort(sortDates)
//     //     .map(dateToISODate);
//     // const dagerISak: ISODate[] = getDatesInDateRanges(perioderISak).sort(sortDates).map(dateToISODate);

//     // const dagerFjernet = dagerISak.filter((d) => isoDateIsNotInArray(d, dagerIMelding)).map(ISODateToDate);
//     // const dagerLagtTil = dagerIMelding.filter((d) => isoDateIsNotInArray(d, dagerISak)).map(ISODateToDate);
//     // const dagerUendret = dagerISak.filter((d) => isoDateIsInArray(d, dagerIMelding)).map(ISODateToDate);

//     // const dagerMedFerie = uniqBy([...dagerLagtTil, ...dagerUendret], dateToISODate).sort(sortDates);

//     // const perioderFjernet: DateRange[] = dateRangeUtils.getDateRangesFromDates(dagerFjernet);
//     // const perioderLagtTil: DateRange[] = dateRangeUtils.getDateRangesFromDates(dagerLagtTil);
//     // const perioderUendret: DateRange[] = dateRangeUtils.getDateRangesFromDates(dagerUendret);

//     // const perioderMedFerie = dateRangeUtils.getDateRangesFromDates(dagerMedFerie);
//     // const perioder: LovbestemtFeriePeriode[] = [
//     //     ...perioderFjernet.map((p) => ({ ...p, skalHaFerie: false })),
//     //     ...perioderMedFerie.map((p) => ({ ...p, skalHaFerie: true })),
//     // ].sort(sortDateRange);

//     // return {
//     //     erEndret: dagerFjernet.length > 0 || dagerLagtTil.length > 0,
//     //     perioder,
//     //     dagerFjernet,
//     //     dagerLagtTil,
//     //     dagerUendret,
//     //     perioderFjernet,
//     //     perioderLagtTil,
//     //     perioderUendret,
//     // };
// };

export const getLovbestemtFerieEndringerForPeriode = (
    periode: DateRange,
    perioderIMelding: LovbestemtFeriePeriode[],
    perioderISak: LovbestemtFeriePeriode[]
) => {
    const endringer = getLovbestemtFerieEndringer(
        getDateRangesWithinDateRange(perioderIMelding, periode),
        getDateRangesWithinDateRange(perioderISak, periode)
    );
    return endringer;
};

export const harFjernetLovbestemtFerie = (ferieSøknad: LovbestemtFerieSøknadsdata | undefined): boolean => {
    if (!ferieSøknad) {
        return false;
    }
    return ferieSøknad.perioderFjernet.length > 0;
};

export const getLovbestemtFerieForPeriode = (
    ferieSøknad: LovbestemtFerieSøknadsdata,
    periode: DateRange
): LovbestemtFerieSøknadsdata => {
    return {
        perioderMedFerie: ferieSøknad.perioderMedFerie.filter((feriePeriode) =>
            dateRangesCollide([feriePeriode, periode])
        ),
        perioderLagtTil: ferieSøknad.perioderLagtTil.filter((feriePeriode) =>
            dateRangesCollide([feriePeriode, periode])
        ),
        perioderFjernet: ferieSøknad.perioderFjernet.filter((feriePeriode) =>
            dateRangesCollide([feriePeriode, periode])
        ),
        feriedager: getFeriedagerIPeriode(ferieSøknad.feriedager, periode),
    };
};
