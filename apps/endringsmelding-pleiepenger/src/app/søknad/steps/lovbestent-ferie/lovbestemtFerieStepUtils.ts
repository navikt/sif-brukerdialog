import { dateRangeToISODateRange, sortDateRange } from '@navikt/sif-common-utils/lib';
import { Søknadsdata, LovbestemtFerieSøknadsdata } from '../../../types/søknadsdata/Søknadsdata';
import { LovbestemtFerieFormFields, LovbestemtFerieFormValues } from './LovbestemtFerieStep';

const lovbestemtFerieInitialFormValues: LovbestemtFerieFormValues = {
    perioder: [],
};

export const getLovbestemtFerieStepInitialValues = (
    søknadsdata: Søknadsdata,
    formValues?: LovbestemtFerieFormValues
): LovbestemtFerieFormValues => {
    if (formValues) {
        return formValues;
    }
    if (søknadsdata.lovbestemtFerie === undefined) {
        return lovbestemtFerieInitialFormValues;
    }
    return {
        perioder: søknadsdata.lovbestemtFerie.perioder.map((periode) => ({
            id: dateRangeToISODateRange(periode),
            fom: periode.from,
            tom: periode.to,
        })),
    };
};

export const getLovbestemtFerieSøknadsdataFromFormValues = (
    values: LovbestemtFerieFormValues
): LovbestemtFerieSøknadsdata => {
    return {
        perioder: values[LovbestemtFerieFormFields.perioder]
            .map((periode) => ({ from: periode.fom, to: periode.tom }))
            .sort(sortDateRange),
    };
};
