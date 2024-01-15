/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { dateToISOString, ISOStringToDate } from '@navikt/sif-common-formik-ds';
import { jsonSort } from '@navikt/sif-common-utils';
import utils from './bostedUtlandUtils';
import { BostedUtland, BostedUtlandFormValues } from './types';

const fom = ISOStringToDate('2000-10-10')!;
const tom = ISOStringToDate('2000-10-11')!;
const id = 'abc';
const landkode = 'Argentina';

const bostedUtland: BostedUtland = {
    fom,
    tom,
    landkode,
    id,
};

const formValues: BostedUtlandFormValues = {
    fom: dateToISOString(fom),
    tom: dateToISOString(tom),
    landkode,
};

const { mapBostedUtlandToFormValues, mapFormValuesToBostedUtland, isValidBostedUtland } = utils;

describe('bostedUtland', () => {
    it('maps bostedUtland to formValues correctly', () => {
        const formJson = jsonSort(formValues);
        const mapJson = jsonSort(mapBostedUtlandToFormValues(bostedUtland));
        expect(mapJson).toEqual(formJson);
    });
    it('maps formValues to bostedUtland correctly - with id', () => {
        const bostedJson = jsonSort(bostedUtland);
        const formJson = jsonSort(mapFormValuesToBostedUtland(formValues, id));
        expect(bostedJson).toEqual(formJson);
    });
    it('isValidBostedUtland verifies type bostedUtland correctly', () => {
        expect(isValidBostedUtland({})).toBeFalsy();
        expect(isValidBostedUtland({ ...bostedUtland, fom: undefined })).toBeFalsy();
        expect(isValidBostedUtland({ ...bostedUtland, tom: undefined })).toBeFalsy();
        expect(isValidBostedUtland({ ...bostedUtland, landkode: undefined })).toBeFalsy();
        expect(isValidBostedUtland({ fom, tom, landkode })).toBeTruthy();
    });
});
