import { dateToISODate } from '@navikt/sif-common-utils/lib';
import { Søknadsdata } from '../../../types/Søknadsdata';
import { ArbeidFormValues } from './ArbeidStep';

export const getArbeidStepInitialValues = (søknadsdata: Søknadsdata): ArbeidFormValues => {
    const { startdato } = søknadsdata.arbeid || {};
    return {
        startdato: startdato ? dateToISODate(startdato) : '',
    };
};
