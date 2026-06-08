import { ReactNode } from 'react';

import { ModalFormAndList } from '../../components';
import { FerieuttakFormDialog } from './FerieuttakDialog';
import { FerieuttakDialogFormConfig } from './FerieuttakDialogForm';
import { FerieuttakList } from './FerieuttakList';
import { Ferieuttak } from './types';

interface Props extends FerieuttakDialogFormConfig {
    ferieuttak?: Ferieuttak[];
    minDate: Date;
    maxDate: Date;
    addButtonLabel: ReactNode;
    addButtonId?: string;
    onChange: (ferieuttak: Ferieuttak[]) => void;
}

export const FerieuttakListAndDialog = ({
    ferieuttak,
    minDate,
    maxDate,
    addButtonLabel,
    addButtonId,
    disableWeekends,
    onChange,
}: Props) => {
    return (
        <ModalFormAndList
            items={ferieuttak}
            getItemId={(f) => f.id}
            addButtonLabel={addButtonLabel}
            addButtonId={addButtonId}
            onChange={onChange}
            listRenderer={({ items, onEdit, onDelete }) => (
                <FerieuttakList ferieuttak={items} onEdit={onEdit} onDelete={onDelete} />
            )}
            dialogRenderer={({ item, allItems, isOpen, onSubmit, onCancel }) => (
                <FerieuttakFormDialog
                    minDate={minDate}
                    maxDate={maxDate}
                    ferieuttak={item}
                    alleFerieuttak={allItems}
                    disableWeekends={disableWeekends}
                    isOpen={isOpen}
                    onValidSubmit={onSubmit}
                    onCancel={onCancel}
                />
            )}
        />
    );
};
