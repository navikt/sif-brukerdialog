import { ValidationFunction } from './types';

export enum ValidateYesOrNoError {
    'yesOrNoIsUnanswered' = 'yesOrNoIsUnanswered',
}

export const ValidateYesOrNoErrorKeys = Object.keys(ValidateYesOrNoError);

type YesOrNoValidationResult = ValidateYesOrNoError.yesOrNoIsUnanswered | undefined;

enum YesOrNo {
    'YES' = 'yes',
    'NO' = 'no',
    'UNANSWERED' = 'unanswered',
}

const getYesOrNoValidator = (): ValidationFunction<YesOrNoValidationResult> => (value: any) => {
    const isAnswered = value === YesOrNo.YES || value === YesOrNo.NO;
    return isAnswered ? undefined : ValidateYesOrNoError.yesOrNoIsUnanswered;
};

export default getYesOrNoValidator;
