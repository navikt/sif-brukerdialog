/* eslint-disable no-console */
import { OmsorgstilbudSøknadsdata, Søknadsdata } from '@types';

import { OmsorgstilbudFormValues } from './OmsorgstilbudForm';

export const getOmsorgstilbudStepInitialValues = (
    søknadsdata: Søknadsdata,
    formValues?: OmsorgstilbudFormValues,
): OmsorgstilbudFormValues => {
    if (formValues) {
        return formValues;
    }
    if (søknadsdata.omsorgstilbud === undefined) {
        return {
            endringer: {},
        };
    }
    return {
        endringer: {},
    };
};

export const getOmsorgstilbudSøknadsdataFromFormValues = (
    values: OmsorgstilbudFormValues,
): OmsorgstilbudSøknadsdata => {
    console.log(values);
    return {
        enkeltdager: [],
        enkeltdagerMeta: {
            erEndret: false,
        },
    };
};
