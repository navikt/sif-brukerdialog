import { ReactNode } from 'react';

import { ModalFormAndList } from '../../components';
import { BostedUtland } from '.';
import { BostedUtlandFormDialog } from './BostedUtlandDialog';
import { BostedUtlandList } from './BostedUtlandList';
import { ISODate } from '@sif/utils';

interface Props {
    minDate?: ISODate;
    maxDate?: ISODate;
    bosteder?: BostedUtland[];
    addButtonLabel: ReactNode;
    addButtonId?: string;
    onChange: (bosteder: BostedUtland[]) => void;
}

export const BostedUtlandListAndDialog = ({
    minDate,
    maxDate,
    bosteder,
    addButtonLabel,
    addButtonId,
    onChange,
}: Props) => {
    return (
        <ModalFormAndList
            items={bosteder}
            getItemId={(bosted) => bosted.id}
            addButtonLabel={addButtonLabel}
            addButtonId={addButtonId}
            onChange={onChange}
            listRenderer={({ items, onEdit, onDelete }) => (
                <BostedUtlandList bosteder={items} onEdit={onEdit} onDelete={onDelete} />
            )}
            dialogRenderer={({ item, allItems, isOpen, onSubmit, onCancel }) => (
                <BostedUtlandFormDialog
                    minDate={minDate}
                    maxDate={maxDate}
                    bosted={item}
                    alleBosteder={allItems}
                    isOpen={isOpen}
                    onValidSubmit={onSubmit}
                    onCancel={onCancel}
                />
            )}
        />
    );
};
