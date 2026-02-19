import { LovbestemtFerieSøknadsdata, Søknadsdata } from '@app/types';
import { getFeriedagerMeta, sortFeriedagerMap as sortFeriedagMap } from '@app/utils';

import { LovbestemtFerieFormValues } from './LovbestemtFerieStep';

export const getLovbestemtFerieStepInitialValues = (
    søknadsdata: Søknadsdata,
    formValues?: LovbestemtFerieFormValues,
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
    values: LovbestemtFerieFormValues,
): LovbestemtFerieSøknadsdata => {
    const feriedager = sortFeriedagMap(values.feriedager);
    return {
        feriedager,
        feriedagerMeta: getFeriedagerMeta(feriedager),
    };
};
