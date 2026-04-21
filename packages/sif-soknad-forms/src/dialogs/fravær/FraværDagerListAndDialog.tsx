import { ReactNode } from 'react';

import { ModalFormAndList } from '../../components';
import { FraværDagDialogFormConfig } from './FraværDagDialogForm';
import { FraværDagFormDialog } from './FraværDialog';
import { FraværDagerList } from './FraværList';
import { FraværDag } from './types';

interface Props extends FraværDagDialogFormConfig {
    fraværDager?: FraværDag[];
    minDate: Date;
    maxDate: Date;
    addButtonLabel: ReactNode;
    addButtonId?: string;
    onChange: (fraværDager: FraværDag[]) => void;
}

export const FraværDagerListAndDialog = ({
    fraværDager,
    minDate,
    maxDate,
    addButtonLabel,
    addButtonId,
    dateRangesToDisable,
    helgedagerIkkeTillatt,
    maksArbeidstidPerDag,
    onChange,
}: Props) => {
    return (
        <ModalFormAndList
            items={fraværDager}
            getItemId={(d) => d.id}
            addButtonLabel={addButtonLabel}
            addButtonId={addButtonId}
            onChange={onChange}
            listRenderer={({ items, onEdit, onDelete }) => (
                <FraværDagerList fraværDager={items} onEdit={onEdit} onDelete={onDelete} />
            )}
            dialogRenderer={({ item, isOpen, onSubmit, onCancel }) => (
                <FraværDagFormDialog
                    minDate={minDate}
                    maxDate={maxDate}
                    fraværDag={item}
                    dateRangesToDisable={dateRangesToDisable}
                    helgedagerIkkeTillatt={helgedagerIkkeTillatt}
                    maksArbeidstidPerDag={maksArbeidstidPerDag}
                    isOpen={isOpen}
                    onValidSubmit={onSubmit}
                    onCancel={onCancel}
                />
            )}
        />
    );
};
