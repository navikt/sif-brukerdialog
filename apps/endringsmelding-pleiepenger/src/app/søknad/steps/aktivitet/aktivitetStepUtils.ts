import { Søknadsdata, AktivitetSøknadsdata } from '../../../types/søknadsdata/Søknadsdata';
import { AktivitetFormFields, AktivitetFormValues } from './AktivitetStep';

const aktivitetInitialFormValues: AktivitetFormValues = {
    aktiviteterSomSkalEndres: [],
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
        aktiviteterSomSkalEndres: søknadsdata.aktivitet.aktivitetSomSkalEndres,
    };
};

export const getAktivitetSøknadsdataFromFormValues = (values: AktivitetFormValues): AktivitetSøknadsdata => {
    return { aktivitetSomSkalEndres: values[AktivitetFormFields.aktiviteterSomSkalEndres] };
};
