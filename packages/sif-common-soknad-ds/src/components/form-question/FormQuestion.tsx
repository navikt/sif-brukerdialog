import { Alert } from '@navikt/ds-react';
/* eslint-disable react/display-name */
import React from 'react';
import FormBlock from '@navikt/sif-common-core-ds/src/atoms/form-block/FormBlock';
import FormikYesOrNoQuestion, {
    FormikYesOrNoQuestionProps,
} from '@navikt/sif-common-formik-ds/src/components/formik-yes-or-no-question/FormikYesOrNoQuestion';
import { ValidationError } from '@navikt/sif-common-formik-ds/src/validation/types';

export interface FormQuestionProps<FieldName>
    extends Omit<FormikYesOrNoQuestionProps<FieldName, ValidationError>, 'legend'> {
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
                        <Alert variant="warning">{stopMessage}</Alert>
                    </FormBlock>
                )}
                {showInfo && infoMessage && (
                    <FormBlock margin="l">
                        <Alert variant="info">{infoMessage}</Alert>
                    </FormBlock>
                )}
            </div>
        </FormBlock>
    );
}

export default FormQuestion;
