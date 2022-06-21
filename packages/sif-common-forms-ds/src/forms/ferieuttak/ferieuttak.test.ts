/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { jsonSort } from '@navikt/sif-common-utils';
import { dateToISOString, ISOStringToDate } from '@navikt/sif-common-formik-ds/lib';
import utils from './ferieuttakUtils';
import { Ferieuttak, FerieuttakFormValues } from './types';

const fom = ISOStringToDate('2000-10-10')!;
const tom = ISOStringToDate('2000-10-11')!;
const id = 'abc';

const ferieuttak: Ferieuttak = {
    fom,
    tom,
    id,
};

const formValues: FerieuttakFormValues = {
    fom: dateToISOString(fom),
    tom: dateToISOString(tom),
};

const { mapFerieuttakToFormValues, mapFormValuesToFerieuttak, isValidFerieuttak } = utils;

describe('ferieuttak', () => {
    it('maps ferieuttak to formValues correctly', () => {
        const formJson = jsonSort(formValues);
        const barnJson = jsonSort(mapFerieuttakToFormValues(ferieuttak));
        expect(barnJson).toEqual(formJson);
    });
    it('maps formValues to ferieuttak correctly - with id', () => {
        const barnJson = jsonSort(ferieuttak);
        const formJson = jsonSort(mapFormValuesToFerieuttak(formValues, id));
        expect(barnJson).toEqual(formJson);
    });
    it('isValidferieuttak verifies type ferieuttak correctly', () => {
        expect(isValidFerieuttak({})).toBeFalsy();
        expect(isValidFerieuttak({ ...ferieuttak, fom: undefined, id })).toBeFalsy();
        expect(isValidFerieuttak({ ...ferieuttak, tom: undefined, id })).toBeFalsy();
        expect(isValidFerieuttak({ fom, tom, id })).toBeTruthy();
    });
});
