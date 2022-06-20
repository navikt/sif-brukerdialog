/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { jsonSort } from '@navikt/sif-common-core/lib/utils/jsonSort';
import { dateToISOString, ISOStringToDate } from '@navikt/sif-common-formik-ds/lib';
import { Utenlandsopphold, UtenlandsoppholdFormValues } from './types';
import utils from './utenlandsoppholdUtils';

const fom = ISOStringToDate('2000-10-10')!;
const tom = ISOStringToDate('2000-10-11')!;
const landkode = 'no';
const id = 'abc';

const utenlandsopphold: Utenlandsopphold = {
    fom,
    tom,
    landkode,
    id,
};

const formValues: UtenlandsoppholdFormValues = {
    fom: dateToISOString(fom),
    tom: dateToISOString(tom),
    landkode,
};

const { mapUtenlandsoppholdToFormValues, mapFormValuesToUtenlandsopphold, isValidUtenlandsopphold } = utils;

describe('utenlandsopphold', () => {
    it('maps utenlandsopphold to formValues correctly', () => {
        const formJson = jsonSort(formValues);
        const mappedJson = jsonSort(mapUtenlandsoppholdToFormValues(utenlandsopphold));
        expect(mappedJson).toEqual(formJson);
    });
    it('maps formValues to utenlandsopphold correctly - with id', () => {
        const id = '132';
        const mappedJson = jsonSort({ ...utenlandsopphold, id });
        const formJson = jsonSort(mapFormValuesToUtenlandsopphold(formValues, id));
        expect(mappedJson).toEqual(formJson);
    });
    it('isValidUtenlandsopphold verifies type utenlandsopphold correctly', () => {
        expect(isValidUtenlandsopphold({})).toBeFalsy();
        expect(isValidUtenlandsopphold({ ...utenlandsopphold, fom: undefined })).toBeFalsy();
        expect(isValidUtenlandsopphold({ ...utenlandsopphold, tom: undefined })).toBeFalsy();
        expect(isValidUtenlandsopphold({ ...utenlandsopphold, landkode: undefined })).toBeFalsy();
        expect(isValidUtenlandsopphold({ fom, tom, landkode })).toBeTruthy();
    });
});
