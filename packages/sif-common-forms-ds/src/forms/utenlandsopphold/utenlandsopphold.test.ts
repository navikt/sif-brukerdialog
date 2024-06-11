/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { jsonSort } from '@navikt/sif-common-utils';
import { dateToISOString, ISOStringToDate } from '@navikt/sif-common-formik-ds';
import { Utenlandsopphold, UtenlandsoppholdFormValues, UtenlandsoppholdVariant } from './types';
import { mapFormValuesToUtenlandsopphold, mapUtenlandsoppholdToFormValues } from './utenlandsoppholdUtils';

const fom = ISOStringToDate('2000-10-10')!;
const tom = ISOStringToDate('2000-10-11')!;
const landkode = 'no';
const id = 'abc';

const utenlandsopphold: Utenlandsopphold = {
    variant: UtenlandsoppholdVariant.UTVIDET,
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

describe('utenlandsopphold', () => {
    it('maps utenlandsopphold to formValues correctly', () => {
        const formJson = jsonSort(formValues);
        const mappedJson = jsonSort(mapUtenlandsoppholdToFormValues(utenlandsopphold, UtenlandsoppholdVariant.UTVIDET));
        expect(mappedJson).toEqual(formJson);
    });
    it('maps formValues to utenlandsopphold correctly - with id', () => {
        const id = '132';
        const mappedJson = jsonSort({ ...utenlandsopphold, id });
        const formJson = jsonSort(mapFormValuesToUtenlandsopphold(formValues, UtenlandsoppholdVariant.UTVIDET, id));
        expect(mappedJson).toEqual(formJson);
    });
});
