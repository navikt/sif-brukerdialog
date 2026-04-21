import { ReactNode } from 'react';

import { ModalFormAndList } from '../../components';
import { UtenlandskNæringFormDialog } from './UtenlandskNæringDialog';
import { UtenlandskNæringList } from './UtenlandskNæringList';
import { UtenlandskNæring } from './types';

interface Props {
    næringer?: UtenlandskNæring[];
    addButtonLabel: ReactNode;
    addButtonId?: string;
    onChange: (næringer: UtenlandskNæring[]) => void;
}

export const UtenlandskNæringListAndDialog = ({ næringer, addButtonLabel, addButtonId, onChange }: Props) => {
    return (
        <ModalFormAndList
            items={næringer}
            getItemId={(n) => n.id}
            addButtonLabel={addButtonLabel}
            addButtonId={addButtonId}
            onChange={onChange}
            listRenderer={({ items, onEdit, onDelete }) => (
                <UtenlandskNæringList næringer={items} onEdit={onEdit} onDelete={onDelete} />
            )}
            dialogRenderer={({ item, isOpen, onSubmit, onCancel }) => (
                <UtenlandskNæringFormDialog
                    næring={item}
                    isOpen={isOpen}
                    onValidSubmit={onSubmit}
                    onCancel={onCancel}
                />
            )}
        />
    );
};
