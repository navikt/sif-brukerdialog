import { ReactNode } from 'react';

import { ModalFormAndList } from '../../components';
import { FosterbarnFormDialog } from './FosterbarnDialog';
import { FosterbarnDialogFormConfig } from './FosterbarnDialogForm';
import { FosterbarnList } from './FosterbarnList';
import { Fosterbarn } from './types';

interface Props extends FosterbarnDialogFormConfig {
    fosterbarn?: Fosterbarn[];
    addButtonLabel: ReactNode;
    addButtonId?: string;
    onChange: (fosterbarn: Fosterbarn[]) => void;
}

export const FosterbarnListAndDialog = ({
    fosterbarn,
    addButtonLabel,
    addButtonId,
    disallowedFødselsnumre,
    onChange,
}: Props) => {
    return (
        <ModalFormAndList
            items={fosterbarn}
            getItemId={(b) => b.id}
            addButtonLabel={addButtonLabel}
            addButtonId={addButtonId}
            onChange={onChange}
            listRenderer={({ items, onEdit, onDelete }) => (
                <FosterbarnList fosterbarn={items} onEdit={onEdit} onDelete={onDelete} />
            )}
            dialogRenderer={({ item, isOpen, onSubmit, onCancel }) => (
                <FosterbarnFormDialog
                    fosterbarn={item}
                    disallowedFødselsnumre={disallowedFødselsnumre}
                    isOpen={isOpen}
                    onValidSubmit={onSubmit}
                    onCancel={onCancel}
                />
            )}
        />
    );
};
