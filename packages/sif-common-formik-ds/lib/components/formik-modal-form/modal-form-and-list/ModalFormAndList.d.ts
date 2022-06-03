import { ModalProps } from '@navikt/ds-react';
import React from 'react';
import { FormikModalFormWidths, ModalFormAndListLabels, ModalFormAndListListItemBase } from '../types';
import './modalFormAndList.scss';
declare type ModalFormRenderer<ItemType> = (props: {
    item?: ItemType;
    allItems?: ItemType[];
    onSubmit: (item: ItemType) => void;
    onCancel: () => void;
}) => React.ReactNode;
declare type ListRenderer<ItemType> = (props: {
    items: ItemType[];
    onEdit: (item: ItemType) => void;
    onDelete: (item: ItemType) => void;
}) => React.ReactNode;
export interface ModalFormAndListProps<ItemType extends ModalFormAndListListItemBase> extends Pick<ModalProps, 'shouldCloseOnOverlayClick'> {
    labels: ModalFormAndListLabels;
    maxItems?: number;
    listRenderer: ListRenderer<ItemType>;
    formRenderer: ModalFormRenderer<ItemType>;
    dialogWidth?: FormikModalFormWidths;
}
interface PrivateProps<ItemType> {
    onChange: (data: ItemType[]) => void;
    items: ItemType[];
    error?: React.ReactNode | boolean;
}
declare type Props<ItemType> = ModalFormAndListProps<ItemType> & PrivateProps<ItemType>;
declare function ModalFormAndList<ItemType extends ModalFormAndListListItemBase>({ items, listRenderer, formRenderer, labels, error, dialogWidth, maxItems, shouldCloseOnOverlayClick, onChange, }: Props<ItemType>): JSX.Element;
export default ModalFormAndList;
//# sourceMappingURL=ModalFormAndList.d.ts.map