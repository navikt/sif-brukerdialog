import getOrgNumberValidator, { ValidateOrgNumberError } from '../getOrgNumberValidator';

describe(`validateOrgNumber`, () => {
    it('returns undefined when the org number is valid', () => {
        expect(getOrgNumberValidator()('979312059')).toBeUndefined();
        expect(getOrgNumberValidator({ required: true })('979312059')).toBeUndefined();
    });
    it(`returns ${ValidateOrgNumberError.orgNumberHasNoValue} when value is empty`, () => {
        expect(getOrgNumberValidator({ required: true })('')).toBe(ValidateOrgNumberError.orgNumberHasNoValue);
    });
    it(`returns ${ValidateOrgNumberError.orgNumberHasInvalidFormat} when value exists and the orgNumber is not valid`, () => {
        expect(getOrgNumberValidator()('213')).toEqual(ValidateOrgNumberError.orgNumberHasInvalidFormat);
        expect(getOrgNumberValidator()(['979312059'])).toEqual(ValidateOrgNumberError.orgNumberHasInvalidFormat);
    });
});
