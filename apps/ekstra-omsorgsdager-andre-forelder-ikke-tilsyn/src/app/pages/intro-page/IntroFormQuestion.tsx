import React from 'react';
import { useIntl } from 'react-intl';
import intlHelper from '@navikt/sif-common-core/lib/utils/intlUtils';
import FormQuestion, { FormQuestionProps } from '@navikt/sif-common-soknad/lib/form-question/FormQuestion';
import QuestionVisibilityBlock from '@navikt/sif-common-soknad/lib/question-visibility/QuestionVisibilityBlock';
import { IntroFormField } from './introFormConfig';

type Props = FormQuestionProps<IntroFormField>;

const IntroFormQuestion: React.FC<Props> = (props) => {
    const intl = useIntl();
    return (
        <QuestionVisibilityBlock fieldName={props.name}>
            <FormQuestion legend={intlHelper(intl, `introForm.${props.name}.spm`)} {...props} />
        </QuestionVisibilityBlock>
    );
};

export default IntroFormQuestion;
