import { dateToISOString, ISOStringToDate } from '@navikt/sif-common-formik-ds';
import { guid } from '@navikt/sif-common-utils';

import { Ferieuttak, FerieuttakFormValues } from './types';

export const isValidFerieuttak = (ferieuttak: Partial<Ferieuttak>): ferieuttak is Ferieuttak => {
    return ferieuttak.from !== undefined && ferieuttak.to !== undefined;
};

const mapFormValuesToFerieuttak = (formValues: FerieuttakFormValues, id: string | undefined): Partial<Ferieuttak> => {
    return {
        id: id || guid(),
        from: ISOStringToDate(formValues.from),
        to: ISOStringToDate(formValues.to),
    };
};

const mapFerieuttakToFormValues = ({ from, to }: Partial<Ferieuttak>): FerieuttakFormValues => {
    return {
        from: dateToISOString(from),
        to: dateToISOString(to),
    };
};

const ferieuttakUtils = {
    isValidFerieuttak,
    mapFerieuttakToFormValues,
    mapFormValuesToFerieuttak,
};

export default ferieuttakUtils;
