import { Søknadsdata, AktivitetSøknadsdata } from '../../../types/søknadsdata/Søknadsdata';
import { AktivitetFormFields, AktivitetFormValues } from './AktivitetStep';

const aktivitetInitialFormValues: AktivitetFormValues = {
    aktivitet: [],
};

export const getAktivitetStepInitialValues = (
    søknadsdata: Søknadsdata,
    formValues?: AktivitetFormValues
): AktivitetFormValues => {
    if (formValues) {
        return formValues;
    }
    if (søknadsdata.aktivitet === undefined) {
        return aktivitetInitialFormValues;
    }
    return {
        aktivitet: [],
    };
};

export const getAktivitetSøknadsdataFromFormValues = (values: AktivitetFormValues): AktivitetSøknadsdata => {
    return { aktivitet: values[AktivitetFormFields.aktivitet] };
};
