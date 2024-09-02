import { ArbeidstidSøknadsdata } from '../../../types/søknadsdata/ArbeidstidSøknadsdata';
import { ArbeidstidFormValues } from './types';

export const getArbeidstidStepInitialValues = (
    arbeidstidSøknadsdata: ArbeidstidSøknadsdata | undefined,
    formValues: ArbeidstidFormValues,
): ArbeidstidFormValues => {
    if (formValues) {
        return formValues;
    }

    return {
        todo: arbeidstidSøknadsdata?.todo,
    };
};

export const getArbeidstidSøknadsdataFromFormValues = (formValues: ArbeidstidFormValues): ArbeidstidSøknadsdata => {
    const { todo } = formValues;
    if (!todo) {
        return {
            todo: 'not yet',
        };
        // throw 'todo is not defined';
    }

    return {
        todo,
    };
};
