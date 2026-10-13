import { ISODate } from '@sif/utils';
import { ReactNode } from 'react';

import { ModalFormAndList } from '../../components';
import { ArbeidUtlandFormData, ArbeidUtlandVariant } from '.';
import { ArbeidUtlandFormDialog } from './ArbeidUtlandDialog';
import { ArbeidUtlandList } from './ArbeidUtlandList';

interface Props {
    minDate?: ISODate;
    maxDate?: ISODate;
    arbeidssteder?: ArbeidUtlandFormData[];
    addButtonLabel: ReactNode;
    addButtonId?: string;
    variant?: ArbeidUtlandVariant;
    onChange: (arbeidssteder: ArbeidUtlandFormData[]) => void;
}

export const ArbeidUtlandListAndDialog = ({
    minDate,
    maxDate,
    arbeidssteder,
    addButtonLabel,
    addButtonId,
    variant = 'generell',
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
                <ArbeidUtlandList
                    arbeidUtlandVariant={variant}
                    arbeidssteder={items}
                    onEdit={onEdit}
                    onDelete={onDelete}
                />
            )}
            dialogRenderer={({ item, allItems, isOpen, onSubmit, onCancel }) => (
                <ArbeidUtlandFormDialog
                    minDate={minDate}
                    maxDate={maxDate}
                    arbeidssted={item}
                    alleArbeider={allItems}
                    isOpen={isOpen}
                    variant={variant}
                    onValidSubmit={onSubmit}
                    onCancel={onCancel}
                />
            )}
        />
    );
};
