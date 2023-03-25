import { DateRange, dateRangeToISODateRange } from '@navikt/sif-common-utils/lib';
import { LovbestemtFeriePeriode } from '../../../types/Sak';
import { LovbestemtFerieSøknadsdata, Søknadsdata } from '../../../types/søknadsdata/Søknadsdata';
import { getFeriedagerMeta, getLovbestemtFerieEndringer } from '../../../utils/lovbestemtFerieUtils';
import { LovbestemtFerieFormValues } from './LovbestemtFerieStep';

export const getLovbestemtFerieStepInitialValues = (
    søknadsdata: Søknadsdata,
    formValues?: LovbestemtFerieFormValues
): LovbestemtFerieFormValues => {
    if (formValues) {
        return formValues;
    }
    if (søknadsdata.lovbestemtFerie === undefined) {
        return {
            feriedager: {},
        };
    }
    return {
        feriedager: søknadsdata.lovbestemtFerie.feriedager,
    };
};

export const getLovbestemtFerieSøknadsdataFromFormValues = (
    values: LovbestemtFerieFormValues
): LovbestemtFerieSøknadsdata => {
    return {
        perioderMedFerie: [],
        perioderFjernet: [],
        perioderLagtTil: [],
        feriedager: values.feriedager,
        feriedagerMeta: getFeriedagerMeta(values.feriedager),
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
