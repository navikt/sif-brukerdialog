import { ReactNode } from 'react';

import { ModalFormAndList } from '../../components';
import { FraværPeriodeFormDialog } from './FraværDialog';
import { FraværPerioderList } from './FraværList';
import { FraværPeriodeDialogFormConfig } from './FraværPeriodeDialogForm';
import { FraværPeriode } from './types';

interface Props extends FraværPeriodeDialogFormConfig {
    fraværPerioder?: FraværPeriode[];
    minDate: Date;
    maxDate: Date;
    addButtonLabel: ReactNode;
    addButtonId?: string;
    onChange: (fraværPerioder: FraværPeriode[]) => void;
}

export const FraværPeriodeListAndDialog = ({
    fraværPerioder,
    minDate,
    maxDate,
    addButtonLabel,
    addButtonId,
    dateRangesToDisable,
    helgedagerIkkeTillat,
    begrensTilSammeÅr,
    onChange,
}: Props) => {
    return (
        <ModalFormAndList
            items={fraværPerioder}
            getItemId={(p) => p.id}
            addButtonLabel={addButtonLabel}
            addButtonId={addButtonId}
            onChange={onChange}
            listRenderer={({ items, onEdit, onDelete }) => (
                <FraværPerioderList fraværPerioder={items} onEdit={onEdit} onDelete={onDelete} />
            )}
            dialogRenderer={({ item, isOpen, onSubmit, onCancel }) => (
                <FraværPeriodeFormDialog
                    minDate={minDate}
                    maxDate={maxDate}
                    fraværPeriode={item}
                    dateRangesToDisable={dateRangesToDisable}
                    helgedagerIkkeTillat={helgedagerIkkeTillat}
                    begrensTilSammeÅr={begrensTilSammeÅr}
                    isOpen={isOpen}
                    onValidSubmit={onSubmit}
                    onCancel={onCancel}
                />
            )}
        />
    );
};
