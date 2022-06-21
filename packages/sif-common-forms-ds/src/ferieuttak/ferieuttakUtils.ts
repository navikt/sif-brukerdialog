import { dateToISOString, ISOStringToDate } from '@navikt/sif-common-formik-ds';
import { guid } from '@navikt/sif-common-utils';
import { Ferieuttak, FerieuttakFormValues } from './types';

export const isValidFerieuttak = (ferieuttak: Partial<Ferieuttak>): ferieuttak is Ferieuttak => {
    return ferieuttak.fom !== undefined && ferieuttak.tom !== undefined;
};

const mapFormValuesToFerieuttak = (formValues: FerieuttakFormValues, id: string | undefined): Partial<Ferieuttak> => {
    return {
        id: id || guid(),
        fom: ISOStringToDate(formValues.fom),
        tom: ISOStringToDate(formValues.tom),
    };
};

const mapFerieuttakToFormValues = ({ fom, tom }: Partial<Ferieuttak>): FerieuttakFormValues => {
    return {
        fom: dateToISOString(fom),
        tom: dateToISOString(tom),
    };
};

const ferieuttakUtils = {
    isValidFerieuttak,
    mapFerieuttakToFormValues,
    mapFormValuesToFerieuttak,
};

export default ferieuttakUtils;
