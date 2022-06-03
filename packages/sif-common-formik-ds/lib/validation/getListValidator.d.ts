import { ValidationFunction } from './types';
export declare enum ValidateListError {
    listIsEmpty = "listIsEmpty",
    listHasTooFewItems = "listHasTooFewItems",
    listHasTooManyItems = "listHastooManyItems"
}
declare type ListValidationResult = undefined | ValidateListError;
interface Options {
    required?: boolean;
    minItems?: number;
    maxItems?: number;
}
declare const getListValidator: (options: Options) => ValidationFunction<ListValidationResult>;
export default getListValidator;
//# sourceMappingURL=getListValidator.d.ts.map