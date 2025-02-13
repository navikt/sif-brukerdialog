import validateYesOrNo, { ValidateYesOrNoError } from '../getYesOrNoValidator';
import { YesOrNo } from '../types';

describe(`validateYesOrNo`, () => {
    it(`returns undefined when the answer is ${YesOrNo.YES}, ${YesOrNo.NO}, has  value`, () => {
        expect(validateYesOrNo()(YesOrNo.YES)).toBeUndefined();
        expect(validateYesOrNo()(YesOrNo.NO)).toBeUndefined();
    });
    it(`returns ${ValidateYesOrNoError.yesOrNoIsUnanswered} when the field has no value`, () => {
        expect(validateYesOrNo()(undefined)).toBe(ValidateYesOrNoError.yesOrNoIsUnanswered);
        expect(validateYesOrNo()('')).toBe(ValidateYesOrNoError.yesOrNoIsUnanswered);
        expect(validateYesOrNo()(null)).toBe(ValidateYesOrNoError.yesOrNoIsUnanswered);
    });
});
