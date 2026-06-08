import { ReactNode } from 'react';

import { ModalFormAndList } from '../../components';
import { EnkeltdatoFormDialog } from './EnkeltdatoDialog';
import { EnkeltdatoDialogFormConfig } from './EnkeltdatoDialogForm';
import { EnkeltdatoList } from './EnkeltdatoList';
import { Enkeltdato } from './types';

interface Props extends EnkeltdatoDialogFormConfig {
    enkeltdatoer?: Enkeltdato[];
    minDate: Date;
    maxDate: Date;
    addButtonLabel: ReactNode;
    addButtonId?: string;
    onChange: (enkeltdatoer: Enkeltdato[]) => void;
}

export const EnkeltdatoerListAndDialog = ({
    enkeltdatoer,
    minDate,
    maxDate,
    addButtonLabel,
    addButtonId,
    disabledDateRanges,
    disableWeekends,
    onChange,
}: Props) => {
    return (
        <ModalFormAndList
            items={enkeltdatoer}
            getItemId={(d) => d.id}
            addButtonLabel={addButtonLabel}
            addButtonId={addButtonId}
            onChange={onChange}
            listRenderer={({ items, onEdit, onDelete }) => (
                <EnkeltdatoList enkeltdatoer={items} onEdit={onEdit} onDelete={onDelete} />
            )}
            dialogRenderer={({ item, allItems, isOpen, onSubmit, onCancel }) => (
                <EnkeltdatoFormDialog
                    minDate={minDate}
                    maxDate={maxDate}
                    enkeltdato={item}
                    alleEnkeltdatoer={allItems}
                    disabledDateRanges={disabledDateRanges}
                    disableWeekends={disableWeekends}
                    isOpen={isOpen}
                    onValidSubmit={onSubmit}
                    onCancel={onCancel}
                />
            )}
        />
    );
};
