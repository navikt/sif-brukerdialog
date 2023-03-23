import { DateRange, dateRangeToISODateRange, sortDateRange } from '@navikt/sif-common-utils/lib';
import { LovbestemtFeriePeriode } from '../../../types/Sak';
import { LovbestemtFerieSøknadsdata, Søknadsdata } from '../../../types/søknadsdata/Søknadsdata';
import { getLovbestemtFerieEndringer } from '../../../utils/lovbestemtFerieUtils';
import { LovbestemtFerieFormFields, LovbestemtFerieFormValues } from './LovbestemtFerieStep';

export const getLovbestemtFerieStepInitialValues = (
    søknadsdata: Søknadsdata,
    formValues?: LovbestemtFerieFormValues
): LovbestemtFerieFormValues => {
    if (formValues) {
        return formValues;
    }
    if (søknadsdata.lovbestemtFerie === undefined) {
        return {
            perioder: [],
        };
    }
    return {
        perioder: [...søknadsdata.lovbestemtFerie.perioderMedFerie],
    };
};

export const getLovbestemtFerieSøknadsdataFromFormValues = (
    values: LovbestemtFerieFormValues,
    lovbestemtFerieISak: LovbestemtFeriePeriode[]
): LovbestemtFerieSøknadsdata => {
    const perioder = values[LovbestemtFerieFormFields.perioder].sort(sortDateRange);
    const { perioderFjernet, perioderLagtTil } = getLovbestemtFerieEndringer(perioder, lovbestemtFerieISak);
    return {
        perioderMedFerie: perioder.filter((p) => p.skalHaFerie === true),
        perioderFjernet,
        perioderLagtTil,
    };
};

const leggTilPeriode = (
    periode: DateRange,
    perioderIMelding: LovbestemtFeriePeriode[],
    perioderISak: LovbestemtFeriePeriode[]
): LovbestemtFeriePeriode[] => {
    return getLovbestemtFerieEndringer([...perioderIMelding, { ...periode, skalHaFerie: true }], perioderISak).perioder;
};

const oppdaterPeriode = (
    opprinneligPeriode: DateRange,
    endretPeriode: DateRange,
    perioderIMelding: LovbestemtFeriePeriode[],
    perioderISak: LovbestemtFeriePeriode[]
): LovbestemtFeriePeriode[] => {
    const perioder = perioderIMelding.filter(
        (p) => dateRangeToISODateRange(p) !== dateRangeToISODateRange(opprinneligPeriode)
    );
    perioder.push({ ...endretPeriode, skalHaFerie: true });
    return getLovbestemtFerieEndringer(perioder, perioderISak).perioder;
};

const deletePeriode = (
    periode: DateRange,
    perioderIMelding: LovbestemtFeriePeriode[],
    perioderISak: LovbestemtFeriePeriode[]
): LovbestemtFeriePeriode[] => {
    const perioder: LovbestemtFeriePeriode[] = perioderIMelding.filter(
        (p) => dateRangeToISODateRange(p) !== dateRangeToISODateRange(periode)
    );
    return getLovbestemtFerieEndringer(perioder, perioderISak).perioder;
};

const undoDeletePeriode = (
    periode: LovbestemtFeriePeriode,
    perioderIMelding: LovbestemtFeriePeriode[],
    perioderISak: LovbestemtFeriePeriode[]
) => {
    const perioder: LovbestemtFeriePeriode[] = [...perioderIMelding, { ...periode, skalHaFerie: true }];
    return getLovbestemtFerieEndringer(perioder, perioderISak).perioder;
};

export const lovbestemtFerieStepUtils = {
    deletePeriode,
    oppdaterPeriode,
    leggTilPeriode,
    undoDeletePeriode,
};
