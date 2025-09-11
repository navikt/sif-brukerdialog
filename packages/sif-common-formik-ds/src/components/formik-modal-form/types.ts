import { ReactElement } from 'react';

export interface ModalFormAndListListItemBase {
    id?: string;
}

export interface ModalFormAndListLabels {
    modalTitle: string;
    modalDescription?: React.ReactNode;
    listTitle: string;
    hideListTitle?: boolean;
    emptyListText?: string;
    addLabel: string;
    description?: ReactElement | string;
}

export interface ModalFormAndInfoLabels {
    modalTitle: string;
    infoTitle?: React.ReactNode;
    addLabel: string;
    editLabel: string;
    deleteLabel: string;
}
export type FormikModalFormWidths = 'narrow' | 'wide';
