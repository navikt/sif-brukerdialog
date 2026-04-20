import { ReactNode } from 'react';

import { ModalFormAndList } from '../../components';
import { AnnetBarnDialog } from './AnnetBarnDialog';
import { AnnetBarnDialogFormConfig } from './AnnetBarnDialogForm';
import { AnnetBarnList } from './AnnetBarnList';
import { AnnetBarn } from './index';

interface Props extends AnnetBarnDialogFormConfig {
    annetBarn?: AnnetBarn[];
    addButtonLabel: ReactNode;
    addButtonId?: string;
    minDate: Date;
    maxDate: Date;
    onChange: (andreBarn: AnnetBarn[]) => void;
}

export const AnnetBarnListAndDialog = ({
    annetBarn,
    addButtonLabel,
    addButtonId,
    minDate,
    maxDate,
    disallowedFødselsnumre,
    aldersgrenseText,
    showBarnTypeOptions,
    onChange,
}: Props) => {
    return (
        <ModalFormAndList
            items={annetBarn}
            getItemId={(barn) => barn.id || barn.fnr}
            addButtonLabel={addButtonLabel}
            addButtonId={addButtonId}
            onChange={onChange}
            listRenderer={({ items, onEdit, onDelete }) => (
                <AnnetBarnList annetBarn={items} onEdit={onEdit} onDelete={onDelete} />
            )}
            dialogRenderer={({ item, isOpen, onSubmit, onCancel }) => (
                <AnnetBarnDialog
                    annetBarn={item}
                    isOpen={isOpen}
                    minDate={minDate}
                    maxDate={maxDate}
                    disallowedFødselsnumre={disallowedFødselsnumre}
                    aldersgrenseText={aldersgrenseText}
                    showBarnTypeOptions={showBarnTypeOptions}
                    onValidSubmit={onSubmit}
                    onCancel={onCancel}
                />
            )}
        />
    );
};
