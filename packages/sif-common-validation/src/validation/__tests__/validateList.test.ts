import getListValidator, { ValidateListError } from '../getListValidator';

describe(`validateList`, () => {
    it('returns undefined when list is defined and has items', () => {
        expect(getListValidator({ required: true })([1])).toBeUndefined();
    });
    it(`returns undefined when list is valid and number of items is within specified range`, () => {
        expect(getListValidator({ minItems: 0 })([1, 2])).toBeUndefined();
        expect(getListValidator({ minItems: 1, maxItems: 1 })([1])).toBeUndefined();
        expect(getListValidator({ minItems: 0, maxItems: 2 })([1, 2])).toBeUndefined();
        expect(getListValidator({ minItems: 0, maxItems: 2 })([1, 2])).toBeUndefined();
    });
    it('returns undefined when list is not required and the list is undefined or has no items', () => {
        expect(getListValidator({ required: false })(undefined)).toBeUndefined();
        expect(getListValidator({ required: false })(null)).toBeUndefined();
        expect(getListValidator({ required: false })([])).toBeUndefined();
    });
    it('returns error when list is required and the list is undefined or has no items', () => {
        expect(getListValidator({ required: true })(undefined)).toEqual(ValidateListError.listIsEmpty);
        expect(getListValidator({ required: true })([])).toEqual(ValidateListError.listIsEmpty);
    });
    it(`returns ${ValidateListError.listHasTooFewItems} when list contains too feew items`, () => {
        expect(getListValidator({ minItems: 1 })([])).toEqual(ValidateListError.listHasTooFewItems);
        expect(getListValidator({ minItems: 3 })([1, 2])).toEqual(ValidateListError.listHasTooFewItems);
    });
    it(`returns ${ValidateListError.listHasTooManyItems} when list contains too many items`, () => {
        expect(getListValidator({ maxItems: 1 })([1, 2, 3])).toEqual(ValidateListError.listHasTooManyItems);
        expect(getListValidator({ maxItems: 3 })([1, 2, 3, 4])).toEqual(ValidateListError.listHasTooManyItems);
    });
});
