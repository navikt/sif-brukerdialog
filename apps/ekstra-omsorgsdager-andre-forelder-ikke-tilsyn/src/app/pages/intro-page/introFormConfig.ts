import { YesOrNo } from '@navikt/sif-common-core/lib/types/YesOrNo';
import { QuestionConfig, Questions } from '@navikt/sif-common-question-config/lib';
import { yesOrNoIsAnswered } from '@navikt/sif-common-core/lib/utils/yesOrNoUtils';

export enum IntroFormField {
    'erAndreForelderenUtAvStandMinst6Måneder' = 'erAndreForelderenUtAvStandMinst6Måneder',
}

export interface IntroFormData {
    [IntroFormField.erAndreForelderenUtAvStandMinst6Måneder]: YesOrNo;
}

export const introFormInitialValues: Partial<IntroFormData> = {
    [IntroFormField.erAndreForelderenUtAvStandMinst6Måneder]: YesOrNo.UNANSWERED,
};

export enum IntroFormAvslag {
    erAndreForelderenIkkeUtAvStandMinst6Måneder = 'erAndreForelderenUtAvStandMinst6Måneder',
}

const Q = IntroFormField;

type IntroFormQuestionsPayload = IntroFormData;

const IntroFormConfig: QuestionConfig<IntroFormQuestionsPayload, IntroFormField> = {
    [Q.erAndreForelderenUtAvStandMinst6Måneder]: {
        isAnswered: ({ erAndreForelderenUtAvStandMinst6Måneder }) =>
            yesOrNoIsAnswered(erAndreForelderenUtAvStandMinst6Måneder),
    },
};

export const IntroFormQuestions = Questions<IntroFormQuestionsPayload, IntroFormField>(IntroFormConfig);
