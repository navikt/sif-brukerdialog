/// <reference types="react" />
import { TestProps, TypedFormInputValidationProps, YesOrNo } from '../../types';
import { FormikRadioGroupProps } from '../formik-radio-group/FormikRadioGroup';
export interface FormikYesOrNoQuestionProps<FieldName, ErrorType> extends TestProps, Omit<FormikRadioGroupProps<FieldName, ErrorType>, 'radios'> {
    labels?: {
        [YesOrNo.YES]?: string;
        [YesOrNo.NO]?: string;
    };
}
declare function FormikYesOrNoQuestion<FieldName, ErrorType>({ name, labels, ...restProps }: FormikYesOrNoQuestionProps<FieldName, ErrorType> & TypedFormInputValidationProps<FieldName, ErrorType>): JSX.Element;
export default FormikYesOrNoQuestion;
//# sourceMappingURL=FormikYesOrNoQuestion.d.ts.map