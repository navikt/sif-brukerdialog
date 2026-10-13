import { TestProps, TypedFormInputValidationProps, YesOrNo } from '../../types';
import { inputPropsToRemove } from '../../utils/inputPropsToRemove';
import FormikRadioGroup, { FormikRadioGroupProps, FormikRadioProp } from '../formik-radio-group/FormikRadioGroup';

export interface FormikYesOrNoQuestionProps<FieldName, ErrorType>
    extends TestProps,
        Omit<FormikRadioGroupProps<FieldName, ErrorType>, 'radios'> {
    labels?: {
        [YesOrNo.YES]?: string;
        [YesOrNo.NO]?: string;
    };
    reverse?: boolean;
}

function FormikYesOrNoQuestion<FieldName, ErrorType>({
    name,
    labels,
    renderHorizontal = false,
    reverse,
    ...restProps
}: FormikYesOrNoQuestionProps<FieldName, ErrorType> & TypedFormInputValidationProps<FieldName, ErrorType>) {
    const { yes: yesLabel = 'Ja', no: noLabel = 'Nei' } = labels || {};
    const testKey = restProps['data-testid'];
    delete restProps['data-testid'];

    const yesRadio: FormikRadioProp = {
        label: yesLabel,
        value: YesOrNo.YES,
        ['data-testid']: testKey ? `${testKey}_yes` : undefined,
    };
    const noRadio: FormikRadioProp = {
        label: noLabel,
        value: YesOrNo.NO,
        ['data-testid']: testKey ? `${testKey}_no` : undefined,
    };

    return (
        <FormikRadioGroup<FieldName, ErrorType>
            data-testid={testKey}
            {...restProps}
            {...inputPropsToRemove}
            renderHorizontal={renderHorizontal}
            radios={reverse ? [noRadio, yesRadio] : [yesRadio, noRadio]}
            name={name}
        />
    );
}

export default FormikYesOrNoQuestion;
