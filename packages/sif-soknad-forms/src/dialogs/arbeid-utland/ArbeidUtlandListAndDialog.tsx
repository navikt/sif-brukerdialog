import { ReactNode } from 'react';

import { ModalFormAndList } from '../../components';
import { ArbeidUtland } from '.';
import { ArbeidUtlandFormDialog } from './ArbeidUtlandDialog';
import { ArbeidUtlandList } from './ArbeidUtlandList';
import { ISODate } from '@sif/utils';

interface Props {
    minDate?: ISODate;
    maxDate?: ISODate;
    arbeidssteder?: ArbeidUtland[];
    addButtonLabel: ReactNode;
    addButtonId?: string;
    onChange: (arbeidssteder: ArbeidUtland[]) => void;
}

export const ArbeidUtlandListAndDialog = ({
    minDate,
    maxDate,
    arbeidssteder,
    addButtonLabel,
    addButtonId,
    onChange,
}: Props) => {
    return (
        <ModalFormAndList
            items={arbeidssteder}
            getItemId={(arbeidssted) => arbeidssted.id}
            addButtonLabel={addButtonLabel}
            addButtonId={addButtonId}
            onChange={onChange}
            listRenderer={({ items, onEdit, onDelete }) => (
                <ArbeidUtlandList arbeidssteder={items} onEdit={onEdit} onDelete={onDelete} />
            )}
            dialogRenderer={({ item, allItems, isOpen, onSubmit, onCancel }) => (
                <ArbeidUtlandFormDialog
                    minDate={minDate}
                    maxDate={maxDate}
                    arbeidssted={item}
                    alleArbeider={allItems}
                    isOpen={isOpen}
                    onValidSubmit={onSubmit}
                    onCancel={onCancel}
                />
            )}
        />
    );
};
