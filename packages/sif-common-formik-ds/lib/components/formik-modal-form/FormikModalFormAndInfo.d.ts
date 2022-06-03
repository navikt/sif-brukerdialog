/// <reference types="react" />
import { FormError, TypedFormInputValidationProps, UseFastFieldProps } from '../../types';
import { ModalFormAndInfoProps } from './modal-form-and-info/ModalFormAndInfo';
export interface FormikModalFormAndInfoProps<FieldName, InfoType, ErrorType> extends ModalFormAndInfoProps<InfoType>, UseFastFieldProps, TypedFormInputValidationProps<FieldName, ErrorType> {
    name: FieldName;
    error?: FormError;
    defaultValue?: InfoType;
    onAfterChange?: (data: InfoType) => void;
}
declare function FormikModalFormAndInfo<FieldName, ItemType, ErrorType>({ name, labels, defaultValue, infoRenderer, formRenderer, onAfterChange, shouldCloseOnOverlayClick, renderEditButtons, renderDeleteButton, dialogWidth, dialogClassName, wrapInfoInPanel, wrapInfoInFieldset, error, validate, useFastField, }: FormikModalFormAndInfoProps<FieldName, ItemType, ErrorType>): JSX.Element;
export default FormikModalFormAndInfo;
//# sourceMappingURL=FormikModalFormAndInfo.d.ts.map