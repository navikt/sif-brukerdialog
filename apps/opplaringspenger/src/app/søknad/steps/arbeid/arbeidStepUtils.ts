import { dateToISODate, ISODateToDate } from '@navikt/sif-common-utils/lib';
import { ArbeidSøknadsdata, Søknadsdata } from '../../../types/søknadsdata/Søknadsdata';
import { ArbeidFormValues } from './ArbeidStep';

export const getArbeidStepInitialValues = (
    søknadsdata: Søknadsdata,
    stepFormValues?: ArbeidFormValues
): ArbeidFormValues => {
    if (stepFormValues) {
        return stepFormValues;
    }
    if (søknadsdata.arbeid === undefined) {
        return {};
    }
    const { startdato } = søknadsdata.arbeid;
    return {
        startdato: startdato ? dateToISODate(startdato) : '',
    };
};

export const getArbeidstidSøknadsdataFromFormValues = (values: ArbeidFormValues): ArbeidSøknadsdata | undefined => {
    return {
        startdato: values.startdato ? ISODateToDate(values.startdato) : undefined,
    };
};
