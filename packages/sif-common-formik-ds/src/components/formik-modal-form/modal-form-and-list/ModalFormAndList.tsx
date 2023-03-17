/* eslint-disable @typescript-eslint/ban-types */
import { Alert, Button, Heading, Modal, ModalProps } from '@navikt/ds-react';
import React, { useState } from 'react';
import ConfirmationDialog from '@navikt/sif-common-core-ds/lib/components/dialogs/confirmation-dialog/ConfirmationDialog';
import { v4 as uuid } from 'uuid';
import bemUtils from '../../../utils/bemUtils';
import SkjemagruppeQuestion from '../../helpers/skjemagruppe-question/SkjemagruppeQuestion';
import { FormikModalFormWidths, ModalFormAndListLabels, ModalFormAndListListItemBase } from '../types';
import './modalFormAndList.scss';

type ModalFormRenderer<ItemType> = (props: {
    item?: ItemType;
    allItems?: ItemType[];
    onSubmit: (item: ItemType) => void;
    onCancel: () => void;
}) => React.ReactNode;

type ListRenderer<ItemType> = (props: {
    items: ItemType[];
    onEdit: (item: ItemType) => void;
    onDelete: (item: ItemType) => void;
}) => React.ReactNode;

export type ModalFormAndListConfirmDeleteProps<ItemType> = {
    title: string;
    okLabel: string;
    cancelLabel: string;
    contentRenderer: (item: ItemType) => React.ReactNode;
};

export interface ModalFormAndListProps<ItemType extends ModalFormAndListListItemBase>
    extends Pick<ModalProps, 'shouldCloseOnOverlayClick'> {
    labels: ModalFormAndListLabels;
    maxItems?: number;
    listRenderer: ListRenderer<ItemType>;
    formRenderer: ModalFormRenderer<ItemType>;
    confirmDelete?: ModalFormAndListConfirmDeleteProps<ItemType>;
    dialogWidth?: FormikModalFormWidths;
}
interface PrivateProps<ItemType> {
    onChange: (data: ItemType[]) => void;
    items: ItemType[];
    error?: React.ReactNode | boolean;
}

type Props<ItemType extends {}> = ModalFormAndListProps<ItemType> & PrivateProps<ItemType>;

const bem = bemUtils('formikModalForm').child('modal');

function ModalFormAndList<ItemType extends ModalFormAndListListItemBase>({
    items = [],
    listRenderer,
    formRenderer,
    labels,
    error,
    dialogWidth = 'narrow',
    maxItems,
    confirmDelete,
    shouldCloseOnOverlayClick = false,
    onChange,
}: Props<ItemType>) {
    const [modalState, setModalState] = React.useState<{ isVisible: boolean; selectedItem?: ItemType }>({
        isVisible: false,
    });
    const [itemToDelete, setItemToDelete] = useState<ItemType | undefined>();

    const handleOnSubmit = (values: ItemType) => {
        if (values.id) {
            onChange([...items.filter((item) => item.id !== values.id), values]);
        } else {
            onChange([...items, { id: uuid(), ...values }]);
        }
        setModalState({ isVisible: false });
    };

    const handleEdit = (item: ItemType) => {
        setModalState({ isVisible: true, selectedItem: item });
    };

    const doDeleteItem = (item: ItemType) => {
        onChange([...items.filter((i) => i.id !== item.id)]);
        if (itemToDelete) {
            setItemToDelete(undefined);
        }
    };

    const handleDelete = (item: ItemType) => {
        if (confirmDelete) {
            setItemToDelete(item);
        } else {
            doDeleteItem(item);
        }
    };

    const resetModal = () => {
        setModalState({ isVisible: false, selectedItem: undefined });
    };

    return (
        <>
            <Modal
                open={modalState.isVisible}
                onClose={resetModal}
                className={bem.classNames(bem.block, bem.modifier(dialogWidth))}
                shouldCloseOnOverlayClick={shouldCloseOnOverlayClick}
                aria-label={labels.modalTitle}>
                <Modal.Content>
                    <div style={{ marginTop: 'var(--a-spacing-1)', paddingBottom: 'var(--a-spacing-2)' }}>
                        <Heading spacing={true} size="medium" level="1">
                            {labels.modalTitle}
                        </Heading>
                    </div>
                    {formRenderer({
                        onSubmit: handleOnSubmit,
                        onCancel: resetModal,
                        item: modalState.selectedItem,
                        allItems: items,
                    })}
                </Modal.Content>
            </Modal>
            <SkjemagruppeQuestion legend={labels.listTitle} error={error}>
                {items.length > 0 && (
                    <div className="modalFormAndList__listWrapper">
                        {listRenderer({ items, onEdit: handleEdit, onDelete: handleDelete })}
                    </div>
                )}
                {items.length === 0 && labels.emptyListText && (
                    <div style={{ marginTop: labels.listTitle ? '1rem' : 'none', paddingBottom: '.5rem' }}>
                        <Alert variant="info">{labels.emptyListText}</Alert>
                    </div>
                )}
                {(maxItems === undefined || maxItems > items.length) && (
                    <div style={{ marginTop: '1rem' }} className={'modalFormAndList__addButton'}>
                        <Button
                            type="button"
                            onClick={() => setModalState({ isVisible: true })}
                            size="small"
                            variant="secondary">
                            {labels.addLabel}
                        </Button>
                    </div>
                )}
            </SkjemagruppeQuestion>

            {confirmDelete && itemToDelete && (
                <ConfirmationDialog
                    title={confirmDelete.title}
                    open={itemToDelete !== undefined}
                    okLabel={confirmDelete.okLabel}
                    cancelLabel={confirmDelete.cancelLabel}
                    onConfirm={() => (itemToDelete ? doDeleteItem(itemToDelete) : null)}
                    onCancel={() => setItemToDelete(undefined)}>
                    {confirmDelete.contentRenderer(itemToDelete)}
                </ConfirmationDialog>
            )}
        </>
    );
}

export default ModalFormAndList;
