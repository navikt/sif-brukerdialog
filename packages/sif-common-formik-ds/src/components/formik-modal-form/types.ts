import { ReactElement } from 'react';

export interface ModalFormAndListListItemBase {
    id?: string;
}

export interface ModalFormAndListLabels {
    modalTitle: string;
    modalDescription?: ReactElement;
    listTitle?: string;
    emptyListText?: string;
    addLabel: string;
    description?: ReactElement | string;
}

export interface ModalFormAndInfoLabels {
    modalTitle: string;
    infoTitle?: ReactElement;
    addLabel: string;
    editLabel: string;
    deleteLabel: string;
}
export type FormikModalFormWidths = 'narrow' | 'wide';
