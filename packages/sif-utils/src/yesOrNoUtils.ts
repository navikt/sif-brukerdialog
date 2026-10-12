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
export const yesOrNoToBoolean = (svar?: YesOrNo): boolean | undefined => {
    switch (svar) {
        case YesOrNo.YES:
            return true;
        case YesOrNo.NO:
            return false;
        case undefined:
        case YesOrNo.UNANSWERED:
            return undefined;
    }
};
