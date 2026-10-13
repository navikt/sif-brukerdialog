import { getYesOrNoValidator, ValidateYesOrNoError } from '../getYesOrNoValidator';
import { YesOrNo } from '../types';

describe(`validateYesOrNo`, () => {
    it(`returns undefined when the answer is ${YesOrNo.YES}, ${YesOrNo.NO}, has  value`, () => {
        expect(getYesOrNoValidator()(YesOrNo.YES)).toBeUndefined();
        expect(getYesOrNoValidator()(YesOrNo.NO)).toBeUndefined();
    });
    it(`returns ${ValidateYesOrNoError.yesOrNoIsUnanswered} when the field has no value`, () => {
        expect(getYesOrNoValidator()(undefined)).toBe(ValidateYesOrNoError.yesOrNoIsUnanswered);
        expect(getYesOrNoValidator()('')).toBe(ValidateYesOrNoError.yesOrNoIsUnanswered);
        expect(getYesOrNoValidator()(null)).toBe(ValidateYesOrNoError.yesOrNoIsUnanswered);
    });
});
