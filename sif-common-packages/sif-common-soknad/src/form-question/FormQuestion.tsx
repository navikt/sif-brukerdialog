/* eslint-disable react/display-name */
import React from 'react';
import FormBlock from '@navikt/sif-common-core/lib/components/form-block/FormBlock';
import FormikYesOrNoQuestion, {
    FormikYesOrNoQuestionProps,
} from '@navikt/sif-common-formik/lib/components/formik-yes-or-no-question/FormikYesOrNoQuestion';
import { ValidationError } from '@navikt/sif-common-formik/lib/validation/types';
import { AlertStripeAdvarsel, AlertStripeInfo } from 'nav-frontend-alertstriper';

export interface FormQuestionProps<FieldName> extends FormikYesOrNoQuestionProps<FieldName, ValidationError> {
    showStop?: boolean;
    description?: React.ReactNode;
    stopMessage?: React.ReactNode;
    infoMessage?: React.ReactNode;
    showInfo?: boolean;
    legend?: React.ReactNode;
    children?: React.ReactNode;
}

export function getTypedFormQuestion<FieldName>() {
    return (props: FormQuestionProps<FieldName>) => <FormQuestion<FieldName> {...props} />;
}

function FormQuestion<FieldName>(props: FormQuestionProps<FieldName>) {
    const { name, showStop, description, stopMessage, showInfo, infoMessage, legend, children, ...rest } = props;
    return (
        <FormBlock>
            {children || <FormikYesOrNoQuestion name={name} legend={legend} description={description} {...rest} />}
            <div aria-live="polite">
                {showStop && stopMessage && (
                    <FormBlock margin="l">
                        <AlertStripeAdvarsel>{stopMessage}</AlertStripeAdvarsel>
                    </FormBlock>
                )}
                {showInfo && infoMessage && (
                    <FormBlock margin="l">
                        <AlertStripeInfo>{infoMessage}</AlertStripeInfo>
                    </FormBlock>
                )}
            </div>
        </FormBlock>
    );
}

export default FormQuestion;
