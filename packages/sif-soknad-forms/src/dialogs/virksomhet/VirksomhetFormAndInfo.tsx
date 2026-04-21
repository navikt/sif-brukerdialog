import { ReactNode } from 'react';

import { ModalFormAndList } from '../../components';
import { Virksomhet } from './types';
import { VirksomhetFormDialog } from './VirksomhetDialog';
import { VirksomhetList } from './VirksomhetList';

interface Props {
    virksomhet?: Virksomhet;
    harFlereVirksomheter?: boolean;
    skipOrgNumValidation?: boolean;
    addButtonLabel: ReactNode;
    addButtonId?: string;
    onChange: (virksomhet: Virksomhet | undefined) => void;
}

export const VirksomhetFormAndInfo = ({
    virksomhet,
    harFlereVirksomheter,
    skipOrgNumValidation,
    addButtonLabel,
    addButtonId,
    onChange,
}: Props) => {
    const items = virksomhet ? [virksomhet] : [];

    return (
        <ModalFormAndList
            items={items}
            getItemId={(v) => v.id}
            maxItems={1}
            addButtonLabel={addButtonLabel}
            addButtonId={addButtonId}
            onChange={(updatedItems) => onChange(updatedItems[0])}
            listRenderer={({ items: listItems, onEdit, onDelete }) => (
                <VirksomhetList virksomheter={listItems} onEdit={onEdit} onDelete={onDelete} />
            )}
            dialogRenderer={({ item, isOpen, onSubmit, onCancel }) => (
                <VirksomhetFormDialog
                    virksomhet={item}
                    harFlereVirksomheter={harFlereVirksomheter}
                    skipOrgNumValidation={skipOrgNumValidation}
                    isOpen={isOpen}
                    onValidSubmit={onSubmit}
                    onCancel={onCancel}
                />
            )}
        />
    );
};
