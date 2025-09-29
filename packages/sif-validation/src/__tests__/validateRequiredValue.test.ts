import getRequiredFieldValidator, { ValidateRequiredFieldError } from '../getRequiredFieldValidator';

describe(`validateRequiredValue`, () => {
    it(`returns undefined when the field has  value`, () => {
        expect(getRequiredFieldValidator()('1')).toBeUndefined();
        expect(getRequiredFieldValidator()(123)).toBeUndefined();
    });
    it(`returns ${ValidateRequiredFieldError.noValue} when the field has no value`, () => {
        expect(getRequiredFieldValidator()(undefined)).toBe(ValidateRequiredFieldError.noValue);
        expect(getRequiredFieldValidator()('')).toBe(ValidateRequiredFieldError.noValue);
        expect(getRequiredFieldValidator()(null)).toBe(ValidateRequiredFieldError.noValue);
    });
});
