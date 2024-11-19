import getNumberValidator, { ValidateNumberError } from '../getNumberValidator';

describe(`validateNumber`, () => {
    it(`returns undefined when not required and value is empty`, () => {
        expect(getNumberValidator({ required: false })('')).toBeUndefined();
    });
    it('returns undefined when value is a valid number or number string', () => {
        expect(getNumberValidator()('1')).toBeUndefined();
        expect(getNumberValidator()('1.2')).toBeUndefined();
        expect(getNumberValidator()('1,2')).toBeUndefined();
        expect(getNumberValidator()('-1')).toBeUndefined();
        expect(getNumberValidator()(' 1')).toBeUndefined();
        expect(getNumberValidator()(' 1 ')).toBeUndefined();
        expect(getNumberValidator()('1 ')).toBeUndefined();
        expect(getNumberValidator()(1)).toBeUndefined();
        expect(getNumberValidator()(2)).toBeUndefined();
    });
    it(`returns ${ValidateNumberError.numberHasNoValue} when value is required and value is empty, undefined or null`, () => {
        expect(getNumberValidator({ required: true })('')).toEqual(ValidateNumberError.numberHasNoValue);
    });
    it(`returns ${ValidateNumberError.numberHasNoValue} when value is required and value contains only spaces`, () => {
        expect(getNumberValidator({ required: true })(' ')).toEqual(ValidateNumberError.numberHasNoValue);
        expect(getNumberValidator({ required: true })('    ')).toEqual(ValidateNumberError.numberHasNoValue);
    });
    it(`returns ${ValidateNumberError.numberHasInvalidFormat} when hasValue and value has invalid format "1.2.3"`, () => {
        expect(getNumberValidator()('1.2.3')).toEqual(ValidateNumberError.numberHasInvalidFormat);
    });
    it(`returns ${ValidateNumberError.numberHasInvalidFormat} when hasValue and value has invalid format "1 3"`, () => {
        expect(getNumberValidator()('1 3')).toEqual(ValidateNumberError.numberHasInvalidFormat);
    });
    it(`returns ${ValidateNumberError.numberHasInvalidFormat} when hasValue and value has invalid format "[1]"`, () => {
        expect(getNumberValidator()([1])).toEqual(ValidateNumberError.numberHasInvalidFormat);
    });
    it(`returns ${ValidateNumberError.numberIsTooSmall} if number is valid and too small`, () => {
        expect(getNumberValidator({ min: 2 })('1')).toEqual(ValidateNumberError.numberIsTooSmall);
        expect(getNumberValidator({ min: 2 })('1,9')).toEqual(ValidateNumberError.numberIsTooSmall);
    });
    it(`returns undefined if number is not too small`, () => {
        expect(getNumberValidator({ min: 2 })('2')).toBeUndefined();
        expect(getNumberValidator({ min: 2 })('2,3')).toBeUndefined();
        expect(getNumberValidator({ min: 2 })(2.3)).toBeUndefined();
        expect(getNumberValidator({ max: 2 })('1,3')).toBeUndefined();
        expect(getNumberValidator({ max: 2 })(1.3)).toBeUndefined();
    });
    it(`returns ${ValidateNumberError.numberIsTooLarge} if number is valid and too small`, () => {
        expect(getNumberValidator({ max: 2 })('2.1')).toEqual(ValidateNumberError.numberIsTooLarge);
        expect(getNumberValidator({ max: 2 })('3')).toEqual(ValidateNumberError.numberIsTooLarge);
        expect(getNumberValidator({ max: 2 })(3)).toEqual(ValidateNumberError.numberIsTooLarge);
    });
    it(`returns ${ValidateNumberError.numberHasDecimals} if number has decimals and allowDecimals === false`, () => {
        expect(getNumberValidator({ allowDecimals: false })('2.1')).toEqual(ValidateNumberError.numberHasDecimals);
        expect(getNumberValidator({ allowDecimals: false })('2,1')).toEqual(ValidateNumberError.numberHasDecimals);
    });
    it(`returns undefined if number has decimals and allowDecimals === true`, () => {
        expect(getNumberValidator({ allowDecimals: true })('2.1')).toBeUndefined();
        expect(getNumberValidator({ allowDecimals: true })('2,1')).toBeUndefined();
    });
});
