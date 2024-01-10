/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { dateToISODate, jsonSort } from '@navikt/sif-common-utils';
import { AnnetBarn, AnnetBarnFormValues } from './types';
import annetBarnUtils from './annetBarnUtils';
import { ISOStringToDate } from '@navikt/sif-common-formik-ds';

const id = '123';
const fnr = '234';
const fødselsdato = ISOStringToDate('2000-10-10')!;
const navn = 'Annet barns navn';

const annetBarn: AnnetBarn = {
    fnr,
    fødselsdato,
    navn,
    id,
};

const formValues: AnnetBarnFormValues = {
    fnr,
    fødselsdato: dateToISODate(fødselsdato),
    navn,
};

const { mapFormValuesToPartialAnnetBarn, isAnnetBarn, mapAnnetBarnToFormValues } = annetBarnUtils;

describe('annetBarn', () => {
    it('maps annet barn to formValues correctly', () => {
        const formJson = jsonSort(formValues);
        const barnJson = jsonSort(mapAnnetBarnToFormValues(annetBarn));
        expect(barnJson).toEqual(formJson);
    });
    it('maps formValues to annetBarn correctly - with id', () => {
        const barnJson = jsonSort(annetBarn);
        const formJson = jsonSort(mapFormValuesToPartialAnnetBarn(formValues, id));
        expect(barnJson).toEqual(formJson);
    });
    it('isAnnetBarn verifies type AnnetBarn correctly', () => {
        expect(isAnnetBarn({})).toBeFalsy();
        expect(isAnnetBarn({ ...annetBarn, fødselsdato: undefined })).toBeFalsy();
        expect(isAnnetBarn({ ...annetBarn, navn: undefined })).toBeFalsy();
        expect(isAnnetBarn({ ...annetBarn, fnr: undefined })).toBeFalsy();
        expect(isAnnetBarn({ fnr, navn, fødselsdato })).toBeTruthy();
    });
});
