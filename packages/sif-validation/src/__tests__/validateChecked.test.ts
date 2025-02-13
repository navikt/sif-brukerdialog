import getCheckedValidator, { ValidateCheckedError } from '../getCheckedValidator';

describe(`validateChecked`, () => {
    it(`returns undefined when value is ${true}`, () => {
        expect(getCheckedValidator()(true)).toBeUndefined();
    });
    it(`returns undefined when value is an array with items`, () => {
        expect(getCheckedValidator()(['a'])).toBeUndefined();
    });
    it(`returns ${ValidateCheckedError.notChecked} when value is not defined`, () => {
        expect(getCheckedValidator()(undefined)).toBe(ValidateCheckedError.notChecked);
    });
    it(`returns ${ValidateCheckedError.notChecked} when value is false`, () => {
        expect(getCheckedValidator()(false)).toBe(ValidateCheckedError.notChecked);
    });
    it(`returns ${ValidateCheckedError.notChecked} when value is an empty array`, () => {
        expect(getCheckedValidator()([])).toBe(ValidateCheckedError.notChecked);
    });
});
