import React from 'react';
import FormQuestion, { FormQuestionProps } from '@navikt/sif-common-soknad/lib/form-question/FormQuestion';
import QuestionVisibilityBlock from '@navikt/sif-common-soknad/lib/question-visibility/QuestionVisibilityBlock';
import { SoknadFormField } from '../types/SoknadFormData';

type Props = FormQuestionProps<SoknadFormField>;

const SoknadFormQuestion: React.FunctionComponent<Props> = (props) => {
    return (
        <QuestionVisibilityBlock fieldName={props.name}>
            <FormQuestion {...props} />
        </QuestionVisibilityBlock>
    );
};

export default SoknadFormQuestion;
