import { ValidationFunction } from './types';
export declare enum ValidateYesOrNoError {
    'yesOrNoIsUnanswered' = "yesOrNoIsUnanswered"
}
declare type YesOrNoValidationResult = ValidateYesOrNoError.yesOrNoIsUnanswered | undefined;
declare const getYesOrNoValidator: () => ValidationFunction<YesOrNoValidationResult>;
export default getYesOrNoValidator;
//# sourceMappingURL=getYesOrNoValidator.d.ts.map