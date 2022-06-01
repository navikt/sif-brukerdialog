import { Alert, Button, Heading, Modal, ModalProps } from '@navikt/ds-react';
import React from 'react';
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

export interface ModalFormAndListProps<ItemType extends ModalFormAndListListItemBase>
    extends Pick<ModalProps, 'shouldCloseOnOverlayClick'> {
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

type Props<ItemType> = ModalFormAndListProps<ItemType> & PrivateProps<ItemType>;

const bem = bemUtils('formikModalForm').child('modal');

function ModalFormAndList<ItemType extends ModalFormAndListListItemBase>({
    items = [],
    listRenderer,
    formRenderer,
    labels,
    error,
    dialogWidth = 'narrow',
    maxItems,
    shouldCloseOnOverlayClick = false,
    onChange,
}: Props<ItemType>) {
    const [modalState, setModalState] = React.useState<{ isVisible: boolean; selectedItem?: ItemType }>({
        isVisible: false,
    });

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

    const handleDelete = (item: ItemType) => {
        onChange([...items.filter((i) => i.id !== item.id)]);
    };

    const resetModal = () => {
        setModalState({ isVisible: false, selectedItem: undefined });
    };

    const showListTitle = items.length > 0;

    return (
        <>
            <Modal
                open={modalState.isVisible}
                onClose={resetModal}
                className={bem.classNames(bem.block, bem.modifier(dialogWidth))}
                shouldCloseOnOverlayClick={shouldCloseOnOverlayClick}>
                <Modal.Content title={labels.modalTitle}>
                    {labels.modalTitle && (
                        <Heading spacing={true} size="large" level="1">
                            {labels.modalTitle}
                        </Heading>
                    )}
                    {formRenderer({
                        onSubmit: handleOnSubmit,
                        onCancel: resetModal,
                        item: modalState.selectedItem,
                        allItems: items,
                    })}
                </Modal.Content>
            </Modal>
            <SkjemagruppeQuestion legend={showListTitle ? labels.listTitle : undefined} error={error}>
                {items.length > 0 && (
                    <div className="modalFormAndList__listWrapper">
                        {listRenderer({ items, onEdit: handleEdit, onDelete: handleDelete })}
                    </div>
                )}
                {items.length === 0 && labels.emptyListText && (
                    <div style={{ paddingBottom: '2rem' }}>
                        <Alert variant="info">{labels.emptyListText}</Alert>
                    </div>
                )}
                {(maxItems === undefined || maxItems > items.length) && (
                    <div
                        style={showListTitle ? { marginTop: '1rem' } : undefined}
                        className={'modalFormAndList__addButton'}>
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
        </>
    );
}

export default ModalFormAndList;
