import { ValidationFunction } from './types';
export declare enum ValidateCheckedError {
    'notChecked' = "notChecked"
}
declare type CheckedValidationResult = ValidateCheckedError | undefined;
declare const getCheckedValidator: () => ValidationFunction<CheckedValidationResult>;
export default getCheckedValidator;
//# sourceMappingURL=getCheckedValidator.d.ts.map