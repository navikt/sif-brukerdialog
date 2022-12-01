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
    if (søknadsdata.arbeidAktivitet === undefined) {
        return aktivitetInitialFormValues;
    }
    return {
        aktiviteterSomSkalEndres: søknadsdata.arbeidAktivitet.aktiviteterSomSkalEndres,
    };
};

export const getAktivitetSøknadsdataFromFormValues = (values: AktivitetFormValues): AktivitetSøknadsdata => {
    return { aktiviteterSomSkalEndres: values[AktivitetFormFields.aktiviteterSomSkalEndres] };
};
