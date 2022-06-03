/// <reference types="react" />
export declare enum YesOrNo {
    'YES' = "yes",
    'NO' = "no",
    'UNANSWERED' = "unanswered"
}
export interface InputTime {
    hours: string;
    minutes: string;
}
export interface DateRange {
    from: Date;
    to: Date;
}
export declare type CancelButtonTypes = 'primary' | 'secondary' | 'tertiary' | 'danger';
export declare type FormError = React.ReactNode | boolean;
export interface TestProps {
    'data-testid'?: string;
}
export interface TypedFormInputValidationProps<FieldName, ErrorType> {
    validate?: (value: any, fieldName: FieldName) => ErrorType | undefined;
}
export interface UseFastFieldProps {
    useFastField?: boolean;
}
export interface CustomFormErrorHandler<ErrorType> {
    fieldErrorHandler: FieldErrorHandler<ErrorType>;
    isHandledErrorTypeFunc?: ErrorTypeChecker<ErrorType>;
}
export declare type FieldErrorHandler<ErrorType> = (error: ErrorType, fieldName: string) => string;
export declare type ErrorTypeChecker<ErrorType = any> = (error: ErrorType) => boolean;
//# sourceMappingURL=index.d.ts.map