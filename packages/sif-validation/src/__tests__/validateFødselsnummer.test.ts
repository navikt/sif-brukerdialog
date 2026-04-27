import getFødselsnummerValidator, { ValidateFødselsnummerError } from '../getFødselsnummerValidator';

describe(`validateFødselsnummer`, () => {
    const generatedFnr = '24420167209';
    const generatedFnr2 = '18410162721';
    const hnr = '13527248013';

    it('returns undefined when the fødselsnummer is valid', () => {
        expect(getFødselsnummerValidator()(generatedFnr)).toBeUndefined();
    });

    it('returns error when the fødselsnummer is a hnr and hnr is not allowed', () => {
        expect(getFødselsnummerValidator()(hnr)).toEqual(ValidateFødselsnummerError.fødselsnummerAsHnrIsNotAllowed);
    });

    it('returns undefined when the fødselsnummer is a hnr and hnr is allowed', () => {
        expect(getFødselsnummerValidator({ allowHnr: true })(hnr)).toBeUndefined();
    });

    it('returns undefined when the fødselsnummer is not required and ha noe value', () => {
        expect(getFødselsnummerValidator({ required: false })(undefined)).toBeUndefined();
        expect(getFødselsnummerValidator({ required: false })(null)).toBeUndefined();
        expect(getFødselsnummerValidator({ required: false })('')).toBeUndefined();
    });

    it(`returns ${ValidateFødselsnummerError.fødselsnummerIsNot11Chars} when the fødselsnummer is not 11 chars`, () => {
        expect(getFødselsnummerValidator()('1234567890')).toEqual(ValidateFødselsnummerError.fødselsnummerIsNot11Chars);
        expect(getFødselsnummerValidator()('123456789012')).toEqual(
            ValidateFødselsnummerError.fødselsnummerIsNot11Chars,
        );
    });

    it(`returns ${ValidateFødselsnummerError.fødselsnummerIsNotAllowed} when the fødselsnummer is same as fødselsnummerIsNotAllowed`, () => {
        expect(getFødselsnummerValidator({ disallowedValues: [generatedFnr] })(generatedFnr)).toEqual(
            ValidateFødselsnummerError.fødselsnummerIsNotAllowed,
        );
    });
    it(`does not returns ${ValidateFødselsnummerError.fødselsnummerIsNotAllowed} when the fødselsnummer is not in fødselsnummerIsNotAllowed`, () => {
        expect(getFødselsnummerValidator({ disallowedValues: [generatedFnr2] })(generatedFnr)).toBeUndefined();
    });
});
