import { ReactNode } from 'react';

import { ModalFormAndList } from '../../components';
import { Utenlandsopphold } from './types';
import { UtenlandsoppholdFormDialog } from './UtenlandsoppholdDialog';
import { UtenlandsoppholdDialogFormConfig } from './UtenlandsoppholdDialogForm';
import { UtenlandsoppholdList } from './UtenlandsoppholdList';

interface Props extends UtenlandsoppholdDialogFormConfig {
    opphold?: Utenlandsopphold[];
    minDate: Date;
    maxDate: Date;
    addButtonLabel: ReactNode;
    addButtonId?: string;
    onChange: (opphold: Utenlandsopphold[]) => void;
}

export const UtenlandsoppholdListAndDialog = ({
    opphold,
    minDate,
    maxDate,
    addButtonLabel,
    addButtonId,
    variant,
    disabledDateRanges,
    onChange,
}: Props) => {
    return (
        <ModalFormAndList
            items={opphold}
            getItemId={(o) => o.id}
            addButtonLabel={addButtonLabel}
            addButtonId={addButtonId}
            onChange={onChange}
            listRenderer={({ items, onEdit, onDelete }) => (
                <UtenlandsoppholdList utenlandsopphold={items} onEdit={onEdit} onDelete={onDelete} />
            )}
            dialogRenderer={({ item, allItems, isOpen, onSubmit, onCancel }) => (
                <UtenlandsoppholdFormDialog
                    minDate={minDate}
                    maxDate={maxDate}
                    opphold={item}
                    alleOpphold={allItems}
                    variant={variant}
                    disabledDateRanges={disabledDateRanges}
                    isOpen={isOpen}
                    onValidSubmit={onSubmit}
                    onCancel={onCancel}
                />
            )}
        />
    );
};
