import getStringValidator, { ValidateStringError } from '../getStringValidator';

describe(`validateString`, () => {
    it(`returns undefined when no options set`, () => {
        expect(getStringValidator()(undefined)).toBeUndefined();
        expect(getStringValidator()(null)).toBeUndefined();
        expect(getStringValidator()('23')).toBeUndefined();
    });
    it(`returns ${ValidateStringError.stringIsNotAString} when value is not string`, () => {
        expect(getStringValidator()(123)).toBe(ValidateStringError.stringIsNotAString);
        expect(getStringValidator()([])).toBe(ValidateStringError.stringIsNotAString);
    });
    it(`returns ${ValidateStringError.stringHasNoValue} when required and no value`, () => {
        expect(getStringValidator({ required: true })(undefined)).toBe(ValidateStringError.stringHasNoValue);
        expect(getStringValidator({ required: true })('')).toBe(ValidateStringError.stringHasNoValue);
        expect(getStringValidator({ required: true })(' ')).toBe(ValidateStringError.stringHasNoValue);
        expect(getStringValidator({ required: true })(null)).toBe(ValidateStringError.stringHasNoValue);
    });
    describe('length validation', () => {
        it(`returns undefined when string is within min length and max length`, () => {
            expect(getStringValidator({ minLength: 2 })('12')).toBeUndefined();
            expect(getStringValidator({ minLength: 2 })('112')).toBeUndefined();
            expect(getStringValidator({ maxLength: 5 })('1123')).toBeUndefined();
            expect(getStringValidator({ maxLength: 5 })('11234')).toBeUndefined();
        });
        it(`returns ${ValidateStringError.stringIsTooShort} when string is too short`, () => {
            expect(getStringValidator({ minLength: 2 })('1')).toBe(ValidateStringError.stringIsTooShort);
        });
        it(`returns ${ValidateStringError.stringIsTooLong} when string is too short`, () => {
            expect(getStringValidator({ maxLength: 2 })('123')).toBe(ValidateStringError.stringIsTooLong);
        });
    });
    describe('validFormat validation', () => {
        const formatRegExp = /^[\w+\s()]+$/;
        it(`returns undefined when string passes regexp test`, () => {
            expect(getStringValidator({ formatRegExp })('asd')).toBeUndefined();
        });
        it(`returns undefined when string passes regexp test 2`, () => {
            expect(getStringValidator({ formatRegExp })('+(47) 11 22 33')).toBeUndefined();
        });
        it(`returns ${ValidateStringError.stringHasInvalidFormat} when string failes regexp test()`, () => {
            expect(getStringValidator({ formatRegExp })('asd,')).toBe(ValidateStringError.stringHasInvalidFormat);
        });
    });
    describe('disableUnicodeCharacters validation', () => {
        const unicodeChar = '👍';
        it(`returns undefined when string passes unicode test`, () => {
            expect(getStringValidator({ disallowUnicodeCharacters: true })('asd')).toBeUndefined();
        });
        it(`returns undefined when string passes unicode test and contains space`, () => {
            expect(getStringValidator({ disallowUnicodeCharacters: true })('asd avc')).toBeUndefined();
        });
        it(`returns ${ValidateStringError.stringContainsUnicodeChacters} when string failes regexp test()`, () => {
            expect(getStringValidator({ disallowUnicodeCharacters: true })(`${unicodeChar}asd`)).toBe(
                ValidateStringError.stringContainsUnicodeChacters,
            );
        });
    });
    describe('disallowInvalidBackendCharacters validation', () => {
        it(`returns undefined for valid text with letters`, () => {
            expect(getStringValidator({ disallowInvalidBackendCharacters: true })('Hei på deg')).toBeUndefined();
        });
        it(`returns undefined for valid text with numbers`, () => {
            expect(getStringValidator({ disallowInvalidBackendCharacters: true })('Test 123')).toBeUndefined();
        });
        it(`returns undefined for valid text with punctuation`, () => {
            expect(
                getStringValidator({ disallowInvalidBackendCharacters: true })('Hei, dette er en test!'),
            ).toBeUndefined();
        });
        it(`returns undefined for valid text with special norwegian characters`, () => {
            expect(getStringValidator({ disallowInvalidBackendCharacters: true })('Blåbærsyltetøy')).toBeUndefined();
        });
        it(`returns undefined for valid text with hyphen and apostrophe`, () => {
            expect(
                getStringValidator({ disallowInvalidBackendCharacters: true })("Anne-Marie O'Brien"),
            ).toBeUndefined();
        });
        it(`returns undefined for text with newlines (textarea support)`, () => {
            expect(getStringValidator({ disallowInvalidBackendCharacters: true })('Linje1\nLinje2')).toBeUndefined();
            expect(getStringValidator({ disallowInvalidBackendCharacters: true })('Linje1\r\nLinje2')).toBeUndefined();
        });
        it(`returns ${ValidateStringError.stringHasInvalidCharacters} for text with emoji`, () => {
            expect(getStringValidator({ disallowInvalidBackendCharacters: true })('Hei 👋')).toBe(
                ValidateStringError.stringHasInvalidCharacters,
            );
        });
        it(`returns ${ValidateStringError.stringHasInvalidCharacters} for text with tab`, () => {
            expect(getStringValidator({ disallowInvalidBackendCharacters: true })('Tekst\tmed\ttab')).toBe(
                ValidateStringError.stringHasInvalidCharacters,
            );
        });
        it(`returns ${ValidateStringError.stringHasInvalidCharacters} for text with special control characters`, () => {
            expect(getStringValidator({ disallowInvalidBackendCharacters: true })('Tekst\x00med\x1Fkontroll')).toBe(
                ValidateStringError.stringHasInvalidCharacters,
            );
        });
        it(`returns ${ValidateStringError.stringHasInvalidCharacters} for text with @`, () => {
            expect(getStringValidator({ disallowInvalidBackendCharacters: true })('test@example.com')).toBe(
                ValidateStringError.stringHasInvalidCharacters,
            );
        });
    });
});
