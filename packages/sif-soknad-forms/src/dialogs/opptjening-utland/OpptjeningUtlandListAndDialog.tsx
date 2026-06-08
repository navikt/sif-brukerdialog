import { ReactNode } from 'react';

import { ModalFormAndList } from '../../components';
import { OpptjeningUtlandFormDialog } from './OpptjeningUtlandDialog';
import { OpptjeningUtlandList } from './OpptjeningUtlandList';
import { OpptjeningUtland } from './types';

interface Props {
    opptjeninger?: OpptjeningUtland[];
    minDate: Date;
    maxDate: Date;
    addButtonLabel: ReactNode;
    addButtonId?: string;
    onChange: (opptjeninger: OpptjeningUtland[]) => void;
}

export const OpptjeningUtlandListAndDialog = ({
    opptjeninger,
    minDate,
    maxDate,
    addButtonLabel,
    addButtonId,
    onChange,
}: Props) => {
    return (
        <ModalFormAndList
            items={opptjeninger}
            getItemId={(o) => o.id}
            addButtonLabel={addButtonLabel}
            addButtonId={addButtonId}
            onChange={onChange}
            listRenderer={({ items, onEdit, onDelete }) => (
                <OpptjeningUtlandList opptjeninger={items} onEdit={onEdit} onDelete={onDelete} />
            )}
            dialogRenderer={({ item, isOpen, onSubmit, onCancel }) => (
                <OpptjeningUtlandFormDialog
                    minDate={minDate}
                    maxDate={maxDate}
                    opptjening={item}
                    isOpen={isOpen}
                    onValidSubmit={onSubmit}
                    onCancel={onCancel}
                />
            )}
        />
    );
};
