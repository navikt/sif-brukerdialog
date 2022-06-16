import React from 'react';
import { FastField, Field, FieldProps } from 'formik';
import { FormError, TypedFormInputValidationProps, UseFastFieldProps } from '../../types';
import { TypedFormikFormContext } from '../typed-formik-form/TypedFormikForm';
import ModalFormAndList, { ModalFormAndListProps } from './modal-form-and-list/ModalFormAndList';
import './formikModalForm.scss';

export interface FormikModalFormAndListProps<FieldName, ItemType, ErrorType>
    extends ModalFormAndListProps<ItemType>,
        UseFastFieldProps,
        TypedFormInputValidationProps<FieldName, ErrorType> {
    name: FieldName;
    error?: FormError;
    sortFunc?: (a: ItemType, b: ItemType) => number;
    onAfterChange?: (values: ItemType[]) => void;
}

function FormikModalFormAndList<FieldName, ItemType, ErrorType>({
    name,
    labels,
    listRenderer,
    formRenderer,
    sortFunc,
    onAfterChange,
    dialogWidth,
    shouldCloseOnOverlayClick,
    error,
    maxItems,
    useFastField,
    validate,
}: FormikModalFormAndListProps<FieldName, ItemType, ErrorType>) {
    const context = React.useContext(TypedFormikFormContext);
    const FieldComponent = useFastField ? FastField : Field;
    return (
        <FieldComponent name={name} validate={validate ? (value: any) => validate(value, name) : undefined}>
            {({ field, form }: FieldProps<ItemType[]>) => {
                return (
                    <ModalFormAndList<ItemType>
                        labels={labels}
                        items={field.value}
                        error={error || (context ? context.getAndRenderFieldErrorMessage(field, form) : undefined)}
                        maxItems={maxItems}
                        dialogWidth={dialogWidth}
                        shouldCloseOnOverlayClick={shouldCloseOnOverlayClick}
                        onChange={(values) => {
                            const updatedValues = sortFunc ? values.sort(sortFunc) : values;
                            form.setFieldValue(field.name, updatedValues);
                            if (onAfterChange) {
                                onAfterChange(updatedValues);
                            }
                            if (context) {
                                context.onAfterFieldValueSet();
                            }
                        }}
                        formRenderer={formRenderer}
                        listRenderer={({ onEdit, onDelete }) => listRenderer({ items: field.value, onDelete, onEdit })}
                    />
                );
            }}
        </FieldComponent>
    );
}

export default FormikModalFormAndList;
