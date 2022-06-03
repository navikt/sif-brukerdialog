import { ModalProps } from '@navikt/ds-react';
import React from 'react';
import { FormikModalFormWidths, ModalFormAndInfoLabels } from '../types';
import './modalFormAndInfo.scss';
declare type ModalFormRenderer<DataType> = (props: {
    data?: DataType;
    onSubmit: (data: DataType) => void;
    onCancel: () => void;
}) => React.ReactNode;
declare type InfoRenderer<DataType> = (props: {
    data: DataType;
    onEdit: (data: DataType) => void;
    onDelete: (data: DataType) => void;
}) => React.ReactNode;
export interface ModalFormAndInfoProps<DataType> extends Pick<ModalProps, 'shouldCloseOnOverlayClick'> {
    labels: ModalFormAndInfoLabels;
    infoRenderer: InfoRenderer<DataType>;
    formRenderer: ModalFormRenderer<DataType>;
    wrapInfoInFieldset?: boolean;
    renderEditButtons?: boolean;
    renderDeleteButton?: boolean;
    dialogWidth?: FormikModalFormWidths;
    dialogClassName?: string;
    wrapInfoInPanel?: boolean;
}
interface PrivateProps<DataType> {
    onDelete: () => void;
    onChange: (data: DataType) => void;
    data?: DataType;
    error?: React.ReactNode | boolean;
}
declare type Props<DataType> = ModalFormAndInfoProps<DataType> & PrivateProps<DataType> & Pick<ModalProps, 'shouldCloseOnOverlayClick'>;
declare function ModalFormAndInfo<DataType>({ data, labels, error, dialogWidth, renderEditButtons, renderDeleteButton, dialogClassName, wrapInfoInPanel, shouldCloseOnOverlayClick, wrapInfoInFieldset, infoRenderer, formRenderer, onDelete, onChange, }: Props<DataType>): JSX.Element;
export default ModalFormAndInfo;
//# sourceMappingURL=ModalFormAndInfo.d.ts.map