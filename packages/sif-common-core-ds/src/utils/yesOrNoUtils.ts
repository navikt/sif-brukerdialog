import { YesOrNo } from '../types/YesOrNo';

export const yesOrNoIsAnswered = (answer?: YesOrNo): boolean => {
    return answer !== undefined && answer !== YesOrNo.UNANSWERED;
};
