import { LovbestemtFerieSøknadsdata, Søknadsdata } from '../../../types/søknadsdata/Søknadsdata';
import { getFeriedagerMeta } from '../../../utils/lovbestemtFerieUtils';
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
        feriedager: values.feriedager,
        feriedagerMeta: getFeriedagerMeta(values.feriedager),
    };
};
