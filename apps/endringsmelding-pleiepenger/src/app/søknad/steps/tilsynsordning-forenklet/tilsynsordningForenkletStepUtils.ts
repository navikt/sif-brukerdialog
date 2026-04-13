import { TilsynsordningForenkletSøknadsdata } from '../../../types/TilsynsordningForenkletSøknadsdata';
import { TilsynsordningForenkletFormValues } from './TilsynsordningForenkletForm';

export const getTilsynsordningStepInitialValues = (
    tilsynsordningSøknadsdata: TilsynsordningForenkletSøknadsdata | undefined,
    formValues?: TilsynsordningForenkletFormValues,
): TilsynsordningForenkletFormValues => {
    if (formValues) {
        return formValues;
    }
    if (tilsynsordningSøknadsdata === undefined) {
        return {
            endringer: {},
        };
    }
    return {
        endringer: tilsynsordningSøknadsdata.endringer,
    };
};

export const getTilsynsordningForenkletSøknadsdataFromFormValues = (
    values: TilsynsordningForenkletFormValues,
): TilsynsordningForenkletSøknadsdata => {
    return {
        endringer: values.endringer,
    };
};
