import { ValidationError, ValidationResult } from './types';
export declare const hasValue: (value: any) => boolean;
export declare const validateAll: <ErrorType = ValidationError>(validations: (() => ValidationResult<ErrorType>)[]) => ErrorType | undefined;
export declare const getNumberFromStringInput: (inputValue: string | undefined) => number | undefined;
//# sourceMappingURL=validationUtils.d.ts.map