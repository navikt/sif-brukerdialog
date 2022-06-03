/// <reference types="react" />
import { FormError, TypedFormInputValidationProps, UseFastFieldProps } from '../../types';
import { ModalFormAndListProps } from './modal-form-and-list/ModalFormAndList';
import './formikModalForm.scss';
export interface FormikModalFormAndListProps<FieldName, ItemType, ErrorType> extends ModalFormAndListProps<ItemType>, UseFastFieldProps, TypedFormInputValidationProps<FieldName, ErrorType> {
    name: FieldName;
    error?: FormError;
    sortFunc?: (a: ItemType, b: ItemType) => number;
    onAfterChange?: (values: ItemType[]) => void;
}
declare function FormikModalFormAndList<FieldName, ItemType, ErrorType>({ name, labels, listRenderer, formRenderer, sortFunc, onAfterChange, dialogWidth, shouldCloseOnOverlayClick, error, maxItems, useFastField, validate, }: FormikModalFormAndListProps<FieldName, ItemType, ErrorType>): JSX.Element;
export default FormikModalFormAndList;
//# sourceMappingURL=FormikModalFormAndList.d.ts.map