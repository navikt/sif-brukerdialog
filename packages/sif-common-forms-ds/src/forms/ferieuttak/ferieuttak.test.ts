/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { jsonSort } from '@navikt/sif-common-utils';
import { dateToISOString, ISOStringToDate } from '@navikt/sif-common-formik-ds';
import utils from './ferieuttakUtils';
import { Ferieuttak, FerieuttakFormValues } from './types';

const from = ISOStringToDate('2000-10-10')!;
const to = ISOStringToDate('2000-10-11')!;
const id = 'abc';

const ferieuttak: Ferieuttak = {
    from,
    to,
    id,
};

const formValues: FerieuttakFormValues = {
    from: dateToISOString(from),
    to: dateToISOString(to),
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
        expect(isValidFerieuttak({ ...ferieuttak, from: undefined, id })).toBeFalsy();
        expect(isValidFerieuttak({ ...ferieuttak, from: undefined, id })).toBeFalsy();
        expect(isValidFerieuttak({ from, to, id })).toBeTruthy();
    });
});
