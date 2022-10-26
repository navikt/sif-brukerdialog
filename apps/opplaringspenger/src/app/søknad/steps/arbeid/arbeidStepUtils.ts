import { dateToISODate, ISODateToDate } from '@navikt/sif-common-utils/lib';
import { ArbeidSøknadsdata, Søknadsdata } from '../../../types/Søknadsdata';
import { ArbeidFormValues } from './ArbeidStep';

export const getArbeidStepInitialValues = (søknadsdata: Søknadsdata): ArbeidFormValues => {
    const { startdato } = søknadsdata.arbeid || {};
    return {
        startdato: startdato ? dateToISODate(startdato) : '',
    };
};

export const getArbeidstidSøknadsdataFromFormValues = (values: ArbeidFormValues): ArbeidSøknadsdata | undefined => {
    return {
        startdato: values.startdato ? ISODateToDate(values.startdato) : undefined,
    };
};
