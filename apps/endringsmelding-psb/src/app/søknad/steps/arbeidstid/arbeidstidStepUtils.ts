import { Søknadsdata, ArbeidstidSøknadsdata } from '../../../types/søknadsdata/Søknadsdata';
import { ArbeidstidFormValues } from './ArbeidstidStep';

const arbeidstidInitialFormValues: ArbeidstidFormValues = {
    arbeidAktivitet: {},
};

export const getArbeidstidStepInitialValues = (
    søknadsdata: Søknadsdata,
    formValues?: ArbeidstidFormValues
): ArbeidstidFormValues => {
    if (formValues) {
        return formValues;
    }
    if (søknadsdata.arbeidstid === undefined) {
        return arbeidstidInitialFormValues;
    }

    return {
        arbeidAktivitet: søknadsdata.arbeidstid.arbeidAktivitet,
    };
};

export const getArbeidstidSøknadsdataFromFormValues = (values: ArbeidstidFormValues): ArbeidstidSøknadsdata => {
    return { arbeidAktivitet: values.arbeidAktivitet };
};
