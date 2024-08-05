import { BodyShort, Radio, RadioGroup, RadioGroupProps, RadioProps, Stack } from '@navikt/ds-react';
import React, { useContext } from 'react';
import { FastField, Field, FieldProps } from 'formik';
import { TestProps, TypedFormInputValidationProps, UseFastFieldProps } from '../../types';
import { getErrorPropForFormikInput } from '../../utils/typedFormErrorUtils';
import { TypedFormikFormContext, TypedFormikFormContextType } from '../typed-formik-form/TypedFormikForm';

export type FormikRadioProp = Omit<RadioProps, 'children' | 'name'> & {
    label: React.ReactNode;
} & TestProps;

interface OwnProps<FieldName> extends Omit<RadioGroupProps, 'name' | 'onChange' | 'children' | 'radios'> {
    name: FieldName;
    radios: FormikRadioProp[];
    renderHorizontal?: boolean;
    afterOnChange?: (newValue: string) => void;
}

export type FormikRadioGroupProps<FieldName, ErrorType> = OwnProps<FieldName> &
    TypedFormInputValidationProps<FieldName, ErrorType> &
    UseFastFieldProps &
    TestProps;

const renderRadiobuttons = (
    context: TypedFormikFormContextType | undefined,
    { field, form }: FieldProps,
    radios: FormikRadioProp[],
    afterOnChange?: (newValue: string) => void,
) => {
    return radios.map((rb, idx) => {
        const { label, ...rest } = rb;
        return (
            <Radio
                key={idx}
                {...rest}
                name={field.name as any}
                onChange={(evt) => {
                    form.setFieldValue(field.name, evt.target.value);
                    const newValue = evt.target.value;
                    if (afterOnChange) {
                        afterOnChange(newValue);
                    }
                    if (context) {
                        context.onAfterFieldValueSet();
                    }
                }}>
                {label}
            </Radio>
        );
    });
};

function FormikRadioGroup<FieldName, ErrorType>({
    name,
    validate,
    radios,
    error,
    useFastField,
    afterOnChange,
    renderHorizontal,
    ...restProps
}: FormikRadioGroupProps<FieldName, ErrorType>) {
    const context = useContext(TypedFormikFormContext);
    const FieldComponent = useFastField ? FastField : Field;
    return (
        <FieldComponent validate={validate ? (value: any) => validate(value, name) : undefined} name={name}>
            {(fieldProps: FieldProps) => {
                const { field, form } = fieldProps;
                return (
                    <RadioGroup
                        {...restProps}
                        description={
                            restProps.description ? <BodyShort as="div">{restProps.description}</BodyShort> : undefined
                        }
                        name={field.name}
                        error={getErrorPropForFormikInput({ field, form, context, error })}
                        value={field.value || ''}>
                        {renderHorizontal ? (
                            <Stack gap="0 6" direction={{ xs: 'column', sm: 'row' }} wrap={false}>
                                {renderRadiobuttons(context, fieldProps, radios, afterOnChange)}
                            </Stack>
                        ) : (
                            renderRadiobuttons(context, fieldProps, radios, afterOnChange)
                        )}
                    </RadioGroup>
                );
            }}
        </FieldComponent>
    );
}

export default FormikRadioGroup;
