import { TextField, TextFieldProps } from '@navikt/ds-react';

import { TextFieldWidths } from '@navikt/sif-common-formik-ds/src/components/formik-text-field/FormikTextFieldUtils';
import { useController, useFormContext } from 'react-hook-form';

interface OwnProps<FieldName> extends Omit<TextFieldProps, 'name' | 'children' | 'width'> {
    name: FieldName;
    width?: TextFieldWidths;
}

export interface TypedFormInputValidationProps<FieldName, ErrorType> {
    validate?: (value: any, fieldName: FieldName) => ErrorType | undefined;
}

export type RhfTextFieldProps<FieldName, ErrorType> = OwnProps<FieldName> &
    TypedFormInputValidationProps<FieldName, ErrorType>;

export const getError = (errors: { [x: string]: any }, name: string): string | undefined => {
    const error = name.split('.').reduce((o, i) => (o !== undefined ? o[i] : o), errors);
    return error?.message;
};

function RhfTextField<FieldName extends string, ErrorType>(props: RhfTextFieldProps<FieldName, ErrorType>) {
    const {
        formState: { errors },
    } = useFormContext();

    const { field } = useController({
        name: props.name,
        // disabled,
        // rules: {
        //     validate: useMemo(() => getValidationRules(validate), [validate]),
        // },
    });
    return <TextField ref={field.ref} {...props} error={getError(errors, props.name)} />;
}

export default RhfTextField;
