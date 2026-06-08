import { ReactNode } from 'react';

import { ModalFormAndList } from '../../components';
import { TidsperiodeFormDialog } from './TidsperiodeDialog';
import { TidsperiodeList } from './TidsperiodeList';
import { DateTidsperiode } from './types';

interface Props {
    tidsperioder?: DateTidsperiode[];
    minDate?: Date;
    maxDate?: Date;
    addButtonLabel: ReactNode;
    addButtonId?: string;
    onChange: (tidsperioder: DateTidsperiode[]) => void;
}

export const TidsperiodeListAndDialog = ({
    tidsperioder,
    minDate,
    maxDate,
    addButtonLabel,
    addButtonId,
    onChange,
}: Props) => {
    return (
        <ModalFormAndList
            items={tidsperioder}
            getItemId={(t) => t.id}
            addButtonLabel={addButtonLabel}
            addButtonId={addButtonId}
            onChange={onChange}
            listRenderer={({ items, onEdit, onDelete }) => (
                <TidsperiodeList tidsperioder={items} onEdit={onEdit} onDelete={onDelete} />
            )}
            dialogRenderer={({ item, allItems, isOpen, onSubmit, onCancel }) => (
                <TidsperiodeFormDialog
                    minDate={minDate}
                    maxDate={maxDate}
                    tidsperiode={item}
                    alleTidsperioder={allItems}
                    isOpen={isOpen}
                    onValidSubmit={onSubmit}
                    onCancel={onCancel}
                />
            )}
        />
    );
};
