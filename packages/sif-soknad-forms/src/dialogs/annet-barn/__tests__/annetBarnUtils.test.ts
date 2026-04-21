import { dateUtils } from '@navikt/sif-common-utils';
import { describe, expect, it } from 'vitest';

import { annetBarnToFormValues, formValuesToAnnetBarn, isAnnetBarn } from '../annetBarnUtils';
import { AnnetBarn, AnnetBarnFormValues } from '../index';

const id = '123';
const fnr = '234';
const fødselsdato = new Date('2000-10-10');
const navn = 'Annet barns navn';

const annetBarn: AnnetBarn = {
    fnr,
    fødselsdato,
    navn,
    id,
};

const formValues: AnnetBarnFormValues = {
    fnr,
    fødselsdato: dateUtils.dateToISODate(fødselsdato),
    navn,
};

describe('annetBarnUtils', () => {
    it('mapper annet barn til formValues', () => {
        expect(annetBarnToFormValues(annetBarn)).toEqual(formValues);
    });

    it('mapper formValues til annet barn med id', () => {
        expect(formValuesToAnnetBarn(formValues, id)).toEqual(annetBarn);
    });

    it('verifiserer om verdi er et gyldig annet barn', () => {
        expect(isAnnetBarn({})).toBe(false);
        expect(isAnnetBarn({ ...annetBarn, fødselsdato: undefined })).toBe(false);
        expect(isAnnetBarn({ ...annetBarn, navn: undefined })).toBe(false);
        expect(isAnnetBarn({ ...annetBarn, fnr: undefined })).toBe(false);
        expect(isAnnetBarn({ fnr, navn, fødselsdato })).toBe(true);
    });

    it('genererer id når ingen oppgis', () => {
        const result = formValuesToAnnetBarn(formValues);
        expect(result.id).toBeDefined();
        expect(result.id).not.toBe(id);
    });

    it('kaster ved ugyldig fødselsdato', () => {
        expect(() => formValuesToAnnetBarn({ ...formValues, fødselsdato: 'ugyldig' })).toThrow();
    });
});
