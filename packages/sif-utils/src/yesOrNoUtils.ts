import { YesOrNo } from './types';

export const yesOrNoIsAnswered = (answer?: YesOrNo): boolean => {
    return answer !== undefined && answer !== YesOrNo.UNANSWERED;
};

export const getYesOrNoFromBoolean = (bool?: boolean): YesOrNo => {
    switch (bool) {
        case true:
            return YesOrNo.YES;
        case false:
            return YesOrNo.NO;
        case undefined:
            return YesOrNo.UNANSWERED;
        default:
            return YesOrNo.UNANSWERED;
    }
};
